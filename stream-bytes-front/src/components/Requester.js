import React from 'react';
import axios from 'axios';


export async function getRequest(){
    await axios.get('https://jsonplaceholder.typicode.com/posts').then(function(response){
        console.log(response)
        return response
    }).catch(function(error){
        console.log(error);
        return
    })
}