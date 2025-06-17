import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import useLocalStorage from '../hooks/useLocalStorage'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Moon, Sun, Plus, Trash2, Check, Filter } from 'lucide-react'

function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const { theme, toggleTheme } = useTheme()

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Task Manager</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {/* Add Task Form */}
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </form>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex-1"
            >
              <Filter className="h-4 w-4 mr-2" />
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
              className="flex-1"
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              className="flex-1"
            >
              Completed
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-2">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="flex items-center gap-2 p-4 rounded-lg border bg-card animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTask(task.id)}
                  className={`shrink-0 ${
                    task.completed ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <Check className="h-5 w-5" />
                </Button>
                <span
                  className={`flex-1 ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground animate-fade-in">
                <p className="text-lg">
                  {tasks.length === 0
                    ? "No tasks yet. Add one above!"
                    : "No tasks match the current filter."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskManager
