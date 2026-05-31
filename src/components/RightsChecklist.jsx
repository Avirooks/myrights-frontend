import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

function getChecklistItems(right) {
  if (Array.isArray(right.checklist) && right.checklist.length > 0) {
    return right.checklist
  }

  if (Array.isArray(right.actionSteps) && right.actionSteps.length > 0) {
    return right.actionSteps
  }

  return []
}

function getTaskStatus(isCompleted) {
  return isCompleted ? 'בוצע' : 'לא בוצע'
}

function buildCurrentTaskKey(rightId, index) {
  return `current-${rightId}-${index}`
}

function buildFutureTaskKey(rightId) {
  return `future-${rightId}`
}

function RightsChecklist({
  id,
  rights = [],
  futureRights = [],
  variant = 'desktop',
}) {
  const [completedTasks, setCompletedTasks] = useState({})
  const [userId, setUserId] = useState(null)
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [saveError, setSaveError] = useState('')

  const hasCurrentRights = rights.length > 0
  const hasFutureRights = futureRights.length > 0

  const totalCurrentTasks = useMemo(() => {
    return rights.reduce((total, right) => {
      return total + getChecklistItems(right).length
    }, 0)
  }, [rights])

  const totalFutureTasks = futureRights.length
  const totalTasks = totalCurrentTasks + totalFutureTasks

  const completedTasksCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length
  }, [completedTasks])

  useEffect(() => {
    let isMounted = true

    async function loadChecklistTasks() {
      setIsLoadingTasks(true)
      setSaveError('')

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          throw userError
        }

        if (!user) {
          if (isMounted) {
            setUserId(null)
            setCompletedTasks({})
          }

          return
        }

        const { data, error } = await supabase
          .from('right_checklist_tasks')
          .select('task_key, is_completed')
          .eq('user_id', user.id)

        if (error) {
          throw error
        }

        const savedTasks = {}

        data.forEach((task) => {
          savedTasks[task.task_key] = task.is_completed
        })

        if (isMounted) {
          setUserId(user.id)
          setCompletedTasks(savedTasks)
        }
      } catch (error) {
        console.error('Checklist load error:', error)

        if (isMounted) {
          setSaveError('לא הצלחנו לטעון את סימוני הצ׳קליסט.')
        }
      } finally {
        if (isMounted) {
          setIsLoadingTasks(false)
        }
      }
    }

    loadChecklistTasks()

    return () => {
      isMounted = false
    }
  }, [])

async function saveTaskToSupabase({
  taskKey,
  rightId,
  taskText,
  taskType,
  isCompleted,
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    throw new Error('No logged in user found')
  }

  const { error } = await supabase.from('right_checklist_tasks').upsert(
    {
      user_id: user.id,
      right_id: rightId,
      task_key: taskKey,
      task_text: taskText,
      task_type: taskType,
      is_completed: isCompleted,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'user_id,task_key',
    }
  )

  if (error) {
    throw error
  }
}

  async function toggleTask({ taskKey, rightId, taskText, taskType }) {
    setSaveError('')

    const nextValue = !completedTasks[taskKey]

    setCompletedTasks((prevTasks) => ({
      ...prevTasks,
      [taskKey]: nextValue,
    }))

    try {
      await saveTaskToSupabase({
        taskKey,
        rightId,
        taskText,
        taskType,
        isCompleted: nextValue,
      })
    } catch (error) {
      console.error('Checklist save error:', error)

      setCompletedTasks((prevTasks) => ({
        ...prevTasks,
        [taskKey]: !nextValue,
      }))

      setSaveError('לא הצלחנו לשמור את הסימון. נסה שוב.')
    }
  }

  return (
    <section
      id={id}
      className={`rights-checklist rights-checklist-${variant}`}
      aria-label="צ׳קליסט מימוש זכויות"
    >
<div className="rights-checklist-header">
  <h2>צ׳קליסט מימוש זכויות</h2>

  {isLoadingTasks && (
    <p className="rights-checklist-progress">טוען סימונים שמורים...</p>
  )}

  {!isLoadingTasks && totalTasks > 0 && (
    <p className="rights-checklist-progress">
      סומנו {completedTasksCount} מתוך {totalTasks} משימות
    </p>
  )}
</div>

      {saveError && <p className="rights-checklist-error">{saveError}</p>}

      {!hasCurrentRights && !hasFutureRights && (
        <div className="rights-checklist-empty">
          <p>
            לאחר מילוי השאלון יוצגו כאן זכויות שניתן לבדוק, משימות למימוש
            וזכויות שקרובות למימוש בעתיד.
          </p>
        </div>
      )}

      {hasCurrentRights && (
        <div className="rights-checklist-section">
          <h3>זכויות למימוש עכשיו</h3>

          {rights.map((right) => {
            const checklistItems = getChecklistItems(right)

            return (
              <div key={right.id} className="rights-checklist-group">
                <div className="rights-checklist-group-header">
                  <h4>{right.title}</h4>
                  <span className="rights-checklist-badge">
                    ניתן לבדיקה עכשיו
                  </span>
                </div>

                {right.shortDescription && (
                  <p className="rights-checklist-note">
                    {right.shortDescription}
                  </p>
                )}

                {checklistItems.length > 0 ? (
                  <ul className="rights-checklist-list">
                    {checklistItems.map((item, index) => {
                      const taskKey = buildCurrentTaskKey(right.id, index)
                      const isCompleted = Boolean(completedTasks[taskKey])

                      return (
                        <li key={taskKey}>
                          <label className="rights-checklist-item">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              disabled={isLoadingTasks}
                              onChange={() =>
                                toggleTask({
                                  taskKey,
                                  rightId: right.id,
                                  taskText: item,
                                  taskType: 'current',
                                })
                              }
                            />

                            <span>{item}</span>

                            <strong
                              className={`rights-checklist-status ${
                                isCompleted
                                  ? 'rights-checklist-status-done'
                                  : 'rights-checklist-status-pending'
                              }`}
                            >
                              {getTaskStatus(isCompleted)}
                            </strong>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p className="rights-checklist-note">
                    לא הוגדרו משימות עבור זכות זו.
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {hasFutureRights && (
        <div className="rights-checklist-section rights-checklist-future">
          <h3>זכויות קרובות למימוש</h3>

          {futureRights.map((right) => {
            const taskKey = buildFutureTaskKey(right.id)
            const isCompleted = Boolean(completedTasks[taskKey])
            const taskText = `לבדוק את הזכות בתאריך ${right.futureDateText}${
              right.futureTimeText ? `, בעוד ${right.futureTimeText}` : ''
            }`

            return (
              <div key={right.id} className="rights-checklist-group">
                <div className="rights-checklist-group-header">
                  <h4>{right.title}</h4>
                  <span className="rights-checklist-badge rights-checklist-badge-future">
                    עתידי
                  </span>
                </div>

                <p className="rights-checklist-note">
                  זכות זו עדיין לא מוצגת כזכות למימוש עכשיו, אך היא קרובה
                  למימוש לפי הגיל שהוגדר בשאלון.
                </p>

                <ul className="rights-checklist-list">
                  <li>
                    <label className="rights-checklist-item">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        disabled={isLoadingTasks}
                        onChange={() =>
                          toggleTask({
                            taskKey,
                            rightId: right.id,
                            taskText,
                            taskType: 'future',
                          })
                        }
                      />

                      <span>{taskText}</span>

                      <strong
                        className={`rights-checklist-status ${
                          isCompleted
                            ? 'rights-checklist-status-done'
                            : 'rights-checklist-status-pending'
                        }`}
                      >
                        {getTaskStatus(isCompleted)}
                      </strong>
                    </label>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default RightsChecklist