
import AddTask from "./AddTask";
import Tasks from "./Tasks";
const Home = ({addTask,tasks,deleteTask,toggleReminder,showAddTask}) => {
    return (
        <> 
       
         {
            showAddTask && <AddTask onAdd={addTask} />
          }
          
          { tasks.length !== 0 ? ( 
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ): "NO Task ! "}
            
        </>
    )
}

export default Home
