import { ThemeProvider } from './context/ThemeContext'
import TaskManager from './components/TaskManager'
import Posts from './components/Posts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import Layout from './components/layout/layout'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <div className="min-h-screen bg-[rgb(var(--background))] transition-colors duration-200">
          <Tabs defaultValue="tasks" className="container mx-auto px-4 py-8">
            <TabsList className="mb-8">
              <TabsTrigger value="tasks">Task Manager</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <TaskManager />
            </TabsContent>
            <TabsContent value="posts">
              <Posts />
            </TabsContent>
          </Tabs>
      </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
