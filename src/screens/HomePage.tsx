// App.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView, Modal, Alert, TouchableOpacity, Image} from 'react-native';
import { getAllTasks, addTask, deleteTask, toggleTaskCompletion, Task } from '../../src/database';
import { PhoneHeight, PhoneWidth } from '../constants/config';
import SearchBar from '../components/SearchBar';

const TaskItem = ({ task, onDelete, onToggleCompletion }: { task: Task, onDelete: (taskId: number) => void, onToggleCompletion: (taskId: number) => void }) => {
  const checkTaskLength = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <View style={[styles.taskItem,{borderLeftWidth: 10 , borderLeftColor: task.priorityColor}]}>
      {/* <CheckBox value={task.completed} onValueChange={() => onToggleCompletion(task.id)} /> */}
      <TouchableOpacity onPress = {() => onToggleCompletion(task.id)} style = {styles.checkboxBtn}>
      {task.completed ? 
        <Text>✔️</Text>:null
      }
      </TouchableOpacity>
      <Text style={task.completed ? styles.completedText : null}>{checkTaskLength(task.content, 28)}</Text>
      <TouchableOpacity 
          testID={`deleteButton-${task.id}`}
          onPress={() => onDelete(task.id)}>
          <Image
            style={styles.dustLogo}
            source={require('../../assets/delete.png')}
          />
      </TouchableOpacity>
    </View>
  );
};

const HomePage = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [control, setControl] = useState(false)
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayName, setDayName] = useState('')
  const [priority, setPriority] = useState(1)
  const [priorityColor, setPriorityColor] = useState('')
  //to make search
  const [searchText, setSearchText] = useState('')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    refreshTasks();
    setControl(!control) //to avoid async bug 
    formatDate(); //to print current date on homepage
  }, []);
  
  //to search when user type something 
  useEffect(() => {
    filterTasks();
  }, [tasks, searchText]);

  //to refresh tasks after any process
  const refreshTasks = async () => {
    const fetchedTasks = await getAllTasks();
    setTasks(fetchedTasks);
  };
  //to add new task into our tasks
  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      await addTask(newTask, priority, priorityColor);
      setNewTask('');
      setModalVisible(false)
      await refreshTasks();
    }
  };
  //to delete any task from our tasks
  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
    refreshTasks();
    setControl(!control)
  };
  //to select as completed any of our task
  const handleToggleCompletion = async (taskId: number) => {
    await toggleTaskCompletion(taskId);
    refreshTasks();
    setControl(!control)
  };
  //simple render function
  const renderTaskItem = (item: Task ) => {
    return(
      <TaskItem task={item} onDelete={async () => await handleDeleteTask(item.id)} onToggleCompletion={ async () => await handleToggleCompletion(item.id)} />
    )
  }
  //to format date JS functions and setState
  const formatDate = () => {
    const date = new Date();
    setDay(date.getUTCDate().toString())
    setMonth(date.getMonth().toString())
    setYear(date.getFullYear().toString())
    //to print days as a word
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setDayName(days[date.getDay()])
  }
  //to set priority for any of our task
  const onSetPriority = (item: number) => {
    if(item === 3){
      setPriority(3)
      setPriorityColor('red')
    }
    else if(item === 2){
      setPriority(2)
      setPriorityColor('yellow')
    }
    else if(item === 1){
      setPriority(1)
      setPriorityColor('green')
    }
  }
  //to render our add task modal
  const modalRenderItem = () => {
    return(
        <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
            <Text>What's your plan?</Text>
            <TextInput
              testID= "newMission"
              style={styles.input}
              placeholder="Add New Plan"
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
            />
            <Text>Is it really difficult?</Text>
            <View style = {styles.priorityView}>
              <TouchableOpacity testID = 'priority3' style = {styles.priorityBtn1} onPress={() => onSetPriority(3)}>{priority === 3? <Text>✔️</Text> : null}</TouchableOpacity>
              <TouchableOpacity testID = 'priority2' style = {styles.priorityBtn2} onPress={() => onSetPriority(2)}>{priority === 2? <Text>✔️</Text> : null}</TouchableOpacity>
              <TouchableOpacity testID = 'priority1' style = {styles.priorityBtn3} onPress={() => onSetPriority(1)}>{priority === 1? <Text>✔️</Text> : null}</TouchableOpacity>
            </View>
            <TouchableOpacity testID='ekle'  style = {styles.innerPlusBtn} onPress={() => handleAddTask()}><Text style = {styles.plusTxt}>+</Text></TouchableOpacity>
          </View>
      </Modal>
    )
  }
  //to search for a task
  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  // Arama işlemini gerçekleştir
  const filterTasks = () => {
    const filtered = tasks.filter(task => task.content.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredTasks(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style = {styles.topContainer}>
            <Text style={styles.header}>{day}.{month}.{year}</Text>
            <Text style = {styles.dayName}>{dayName}</Text>
            <Text style = {styles.motivationTxt}>Today is the first day of the rest of your life!</Text>
            <Text style = {styles.motivationTxt}>And you have {tasks.length} tasks for today</Text>
            <SearchBar onSearch={handleSearch}/>

        </View>
        {
            modalRenderItem()
        }
        <View style = {styles.renderMainContainer}>
            <FlatList
            data={filteredTasks.length > 0 ? filteredTasks : tasks}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => (
                renderTaskItem(item)
            )}
            />
            <TouchableOpacity 
            testID='openModal'
            onPress={() => setModalVisible(!modalVisible)}
            style = {styles.plusBtn}>
                <Text style = {styles.plusTxt}>+</Text>
            </TouchableOpacity>
        </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7e2eb',
  },
  topContainer: {
    height: PhoneHeight * 0.25,
    backgroundColor:'#c7e2eb',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20
  },
  dayName:{
    marginLeft: 20,
  },
  motivationTxt: {
    fontWeight:'200',
    marginLeft: 20,
  },
  modalView: {
    justifyContent:'space-around',
    width: PhoneWidth * 0.9,
    height: PhoneHeight * 0.4,
    marginTop: PhoneHeight * 0.1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
  },
  input: {
    height: PhoneHeight * 0.05,
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  priorityView: {
    flexDirection:'row',
    height: PhoneHeight * 0.05,
    alignItems:'center',
  },
  taskItem: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    width: '90%',
    height: PhoneHeight * 0.075,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf:'center'
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 10,
  },
  renderMainContainer: {
    height: PhoneHeight * 0.75,
    backgroundColor: '#edebad',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    paddingTop: 40,

  },
  plusBtn: {
    borderWidth:0, 
    width: PhoneWidth * 0.15,
    height: PhoneHeight * 0.085,
    borderRadius: PhoneWidth * 0.15,
    alignSelf: 'flex-end',
    marginRight: PhoneWidth * 0.05,
    marginBottom: PhoneHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#c7e2eb',
    shadowColor: 'blue',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addBtn: {
    backgroundColor: 'green',
    width: '20%',
    height: '20%',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
  addTxt: {
    fontWeight: '300',
    color: 'white'
  },
 
  checkboxBtn: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 100,
    alignItems:'center',
    justifyContent:'center',
  },
  dustLogo: {
    width: 20,
    height: 20
  },
  
  priorityBtn1: {
    borderWidth:1,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginRight: 5
  },
  priorityBtn2: {
    borderWidth:1,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginRight: 5
  },
  priorityBtn3: {
    borderWidth:1,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginRight: 5
  },
  plusTxt: {
    fontSize: 34
  },
  innerPlusBtn: {
    borderWidth:0, 
    width: PhoneWidth * 0.15,
    height: PhoneHeight * 0.085,
    borderRadius: PhoneWidth * 0.15,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#c7e2eb',
    shadowColor: 'blue',
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
});

export default HomePage;
