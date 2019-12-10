class PositionStr{
  /**
   * arr————数组，str————下拉框选中的数据
   * 返回选中值的下标
   */
  radio_position(arr,str){
    var index=0;
    arr.forEach((v,i)=>{
      if (v == str) {
        index = i
      }
    })
    return index;
  }
  
  /**
   * arr————对象集合，arr_str————复选框选中的数据
   * 返回选中的对象集合
   */
  check_position(arr,arr_str){
    if (arr_str==null || arr_str.length<=0){
      return arr
    }
    arr.forEach(v=>{
      if (arr_str.indexOf(v.name)>=0){
        v.checked=true
      }
    })
    return arr
  }
} export { PositionStr }