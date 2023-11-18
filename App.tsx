// App.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView, Modal, Alert, TouchableOpacity, Image} from 'react-native';
import { getAllTasks, addTask, deleteTask, toggleTaskCompletion, Task } from './src/database';
import { PhoneHeight, PhoneWidth } from './src/constants/config';

const TaskItem = ({ task, onDelete, onToggleCompletion }: { task: Task, onDelete: (taskId: number) => void, onToggleCompletion: (taskId: number) => void }) => {
  const checkTaskLength = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <View style={styles.taskItem}>
      {/* <CheckBox value={task.completed} onValueChange={() => onToggleCompletion(task.id)} /> */}
      <TouchableOpacity onPress = {() => onToggleCompletion(task.id)} style = {styles.checkboxBtn}>
      {task.completed ? 
        <Text>✔️</Text>:null
      }
      </TouchableOpacity>
      <Text style={task.completed ? styles.completedText : null}>{checkTaskLength(task.content, 18)}</Text>
      <TouchableOpacity 
          testID={`deleteButton-${task.id}`}
          onPress={() => onDelete(task.id)}>
          <Image
            style={styles.dustLogo}
            source={require('./assets/favicon.png')}
          />
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [control, setControl] = useState(false)
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayName, setDayName] = useState('')


  useEffect(() => {
    refreshTasks();
    setControl(!control)
    formatDate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await refreshTasks();
    };
  
    fetchData();
  }, [tasks]);
  

  const refreshTasks = async () => {
    const fetchedTasks = await getAllTasks();
    setTasks(fetchedTasks);
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      await addTask(newTask);
      setNewTask('');
      setModalVisible(false)
      await refreshTasks();
    }
  };
  
  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
    refreshTasks();
    setControl(!control)
  };
  const handleToggleCompletion = async (taskId: number) => {
    await toggleTaskCompletion(taskId);
    refreshTasks();
    setControl(!control)
  };

  const renderTaskItem = (item: Task ) => {
    return(
      <TaskItem task={item} onDelete={async () => await handleDeleteTask(item.id)} onToggleCompletion={ async () => await handleToggleCompletion(item.id)} />
    )
  }
  const formatDate = () => {
    const date = new Date();
    setDay(date.getUTCDate().toString())
    setMonth(date.getMonth().toString())
    setYear(date.getFullYear().toString())
    //to print days as a word
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setDayName(days[date.getDay()])
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.topContainer}>
        <Text style={styles.header}>{day}.{month}.{year}</Text>
        <Text style = {styles.dayName}>{dayName}</Text>
        <Text style = {styles.motivationTxt}>Today is the first day of the rest of your life!</Text>
        <Text style = {styles.motivationTxt}>And you have {tasks.length} tasks for today</Text>

      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
            <TextInput
              testID= "newMission"
              style={styles.input}
              placeholder="Yeni görev ekle"
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
            />
            <TouchableOpacity  style = {styles.addBtn} onPress={() => handleAddTask()}><Text style = {styles.addTxt}>Ekle</Text></TouchableOpacity>
          </View>
      </Modal>
      <View style = {styles.renderMainContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            renderTaskItem(item)
          )}
        />
        <TouchableOpacity 
          testID='openModal'
          onPress={() => setModalVisible(!modalVisible)}
          style = {styles.plusBtn}>
            <Text>+</Text>
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
    height: PhoneHeight * 0.2,
    backgroundColor:'#c7e2eb'
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
    height: PhoneHeight * 0.8,
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
  modalView: {
    justifyContent:'center',
    width: PhoneWidth * 0.9,
    height: PhoneHeight * 0.3,
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
    alignItems: 'center'
  },
  addBtn: {
    backgroundColor: 'green',
    width: '20%',
    height: '20%',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  addTxt: {
    fontWeight: '300',
    color: 'white'
  },
  input: {
    height: '20%',
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
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
  }
});

export default App;
