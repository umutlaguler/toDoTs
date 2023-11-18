// App.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView, Modal, Alert, TouchableOpacity} from 'react-native';
import { getAllTasks, addTask, deleteTask, toggleTaskCompletion, Task } from './src/database';
import { PhoneHeight, PhoneWidth } from './src/constants/config';

const TaskItem = ({ task, onDelete, onToggleCompletion }: { task: Task, onDelete: (taskId: number) => void, onToggleCompletion: (taskId: number) => void }) => {
  return (
    <View style={styles.taskItem}>
      {/* <CheckBox value={task.completed} onValueChange={() => onToggleCompletion(task.id)} /> */}
      <TouchableOpacity onPress = {() => onToggleCompletion(task.id)} style = {styles.checkboxBtn}>
      {task.completed ? 
        <Text>✔️</Text>:null
      }
      </TouchableOpacity>
      <Text style={task.completed ? styles.completedText : null}>{task.content}</Text>
      <Button 
      testID={`deleteButton-${task.id}`}
      title="Sil" onPress={() => onDelete(task.id)} />
    </View>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [control, setControl] = useState(false)
  useEffect(() => {
    refreshTasks();
    setControl(!control)
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 2,
    width: PhoneWidth * 0.95,
    alignSelf:'center'
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginLeft: 10,
  },
  plusBtn: {
    borderWidth:2, 
    width: PhoneWidth * 0.15,
    height: PhoneHeight * 0.085,
    borderRadius: PhoneWidth * 0.15,
    alignSelf: 'flex-end',
    marginRight: PhoneWidth * 0.05,
    marginBottom: PhoneHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center'
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
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
  }
});

export default App;
