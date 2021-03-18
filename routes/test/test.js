exports.route = {
  async get({id}) {
    
    let results
    
    if(!id){
      sql=`SELECT * FROM equipment_type`

      results = await this.dbQuery(sql).catch(err=>{
        console.log(err)
        throw "数据库错误"
      })
    }
    else{
      //测试输入  get test?id=a5%s
      sql=`SELECT uuid FROM equipment_type where uuid like '`+id+`'`

      results = await this.dbQuery(sql).catch(err=>{
        console.log(err)
        throw "数据库错误"
      })

    }
    return { results }
  }
}