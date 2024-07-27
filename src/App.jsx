import { useState } from "react";
import NewProject from "./components/NewProjects";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";


function App() {

  const [projectState , setProjectState] = useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  })
  
  function handleAddTask(text){
    setProjectState((prevState)=>{
      const TaskId=Math.random();
      const newTask ={
         text: text,
         projectId: prevState.selectedProjectId,
          id: TaskId
      } 
      return{
        ...prevState,
        tasks:[...prevState.tasks,newTask]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectState((prevState)=>{
      return{
          ...prevState,
          selectedProjectId:null,
          tasks : prevState.tasks.filter(
            (task)=>task.id!== id)
      }
    }
  )
  }

  function handleSelectProject(id){
    setProjectState((prevState)=>{
      return{
          ...prevState,
          selectedProjectId:id
      }
    }
  )
  }
 
  function handleStartAddProject(){
    setProjectState((prevState)=>{
      return{
          ...prevState,
          selectedProjectId:null
      }
    }
  )
  }

function handleDeleteProject(){
  setProjectState((prevState)=>{
    return{
        ...prevState,
        selectedProjectId:null,
        projects : prevState.projects.filter((project)=>project.id!==prevState.selectedProjectId)
    }
  }
)
}

  function handleCancelAddProject(){
    setProjectState((prevState)=>{
      return{
          ...prevState,
          selectedProjectId:undefined
      }
    }
  )
  }

  function handleAddProject(projectData){
    setProjectState((prevState)=>{
      const projectId=Math.random();
      const newProject ={
         ...projectData,
          id: projectId
      } 
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      }
    })
  }
  console.log(projectState)
  
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)
  
  let content = <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectState.tasks}/>
  
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }


  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
