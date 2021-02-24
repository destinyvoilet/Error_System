const express=require('express')
const app=express()
const axios=require('axios')
const fs=require('fs')
const bodyParser = require("body-parser")
const {count} = require('console')

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(5050,()=>{
    console.log('search listening on port 5050!')
})

var times=''
var item=0
var count1=0

app.get('/',(req,res)=>{
    fs.readFile('./login.html',(err,data)=>{
        if(err) throw err
        else{
            res.send(data.toString())
        }
    })
})

app.post('/login',(request,response)=>{
    console.log(request.body)
    var data={
        schoolYear: '2020',
        studentNo: request.body.studentNo
    }
    axios.post('https://tyxsjpt.seu.edu.cn/api/exercise/morning/attendance/get-by-student',data)
    .then(res => {
        for(item in res.data.data){
            var i=Number(item)
            i+=1
            times+=`<tr><td>第${i}次跑操时间</td><td>${res.data.data[item].recordTime}</td></tr>`
        }
        count1=Object.keys(res.data.data).length
    })
    .catch(error => {
        console.error(error)
        })
        var datas={
            schoolYear: '2021',
            studentNo: request.body.studentNo
        }
    axios.post('https://tyxsjpt.seu.edu.cn/api/exercise/morning/attendance/get-by-student',datas)
        .then(res => {
            for(var items in res.data.data){
                var itemss=parseInt(items)+parseInt(item)+2
                times+=`<tr><td>第${itemss}次跑操时间</td><td>${res.data.data[items].recordTime}</td></tr>`
            }
            let counts=Object.keys(res.data.data).length+count1
            fs.readFile('./result.html',(err,data)=>{
                if(err) throw err
                else{
                    response.send(data.toString().replace('@@@Time@@@',times).replace('@@@count@@@',counts.toString()))
                }
            })
        })
        .catch(error => {
            console.error(error)
        })
})