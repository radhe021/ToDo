

import { StatusBar } from 'expo-status-bar';
import React ,{ useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform,Button, Alert } from 'react-native';
import Task from "./Tasks/Task";

export default function App() {
   const [taskText, settaskText]:any | null = useState('');
   const [taskItem, settaskItem]:any = useState([]);
   const handleAddTask = () => {
     Keyboard.dismiss();
    // console.log(taskText)
     settaskItem([...taskItem,taskText]);
     settaskText(null);
   }
  const completedtask = (index:number) =>{
    let itemCopy = [...taskItem];
    itemCopy.splice(index,1);
    settaskItem(itemCopy);
  }

  const emptyTaskHandler = () =>{
    Alert.alert(
     'Emptly Task Input',
     'Please write something in Task',
     [
       {
         text:'Go Back',
         onPress: ()=> console.log('Going back')}
     ],
     {cancelable:true}
    );
  }


  return (
    <View style={styles.container}>
       <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      <View style={styles.taskWrapper}>
         <Text style={styles.appTitle}> ToDo Task List </Text>
          <View style={styles.taskItem}>
                  {
                    taskItem.map((item:string,index:number) =>{
                 return  (
                    <TouchableOpacity key={index} onPress={()=> completedtask(index)}>
                    <Task text={item}/>
                    </TouchableOpacity>
                  )}
                  )
                }
                  <Task text='Task 1'/>
                
          </View>
      </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}
      style={styles.writeTaskWrapper}
      >
       <TextInput style={styles.input} placeholder={'Write a task to add'} value={taskText} onChangeText={(text)=> AddTaskHandler(text)} />
        <TouchableOpacity onPress={()=> handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );

  function AddTaskHandler(text:string) {
    if(text =='' || text == null || text == undefined)
    {
       return <View style={styles.container}>
         <Button title='Empty Task' onPress={emptyTaskHandler} />
       </View>
    }
    settaskText(text);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20
  },
  appTitle:{
      fontSize: 24,
      fontWeight: 'bold'
  },
  taskItem:{
    marginTop:30
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
input:{
  paddingVertical:15,
  paddingHorizontal:15,
  width:250,
  backgroundColor:'#FFF',
  borderRadius:60,
  borderColor:'#C0C0C0',
  borderWidth:1
},
addWrapper:{
  width: 60,
  height: 60,
  backgroundColor: '#FFF',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#C0C0C0',
  borderWidth: 1,
},
addText:{
},
});
