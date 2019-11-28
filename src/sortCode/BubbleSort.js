const arr = [11,1,2,22,3,44,5,66,2,77,7,9,88,8]


function bubbling1(arr) {
  let result = []

  let count = 0
  for(let i=0; i< arr.length; i++) {
    for(let j=0; j< arr.length; j++) {
      if(arr[i] < arr[j]) {
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
      }
      count ++
    }
    // result.push(arr[i])
  }
  console.log('比较次数',count)
  // count 196

  return arr
}

function bubbling2(arr) {

  let count = 0
  for(let i=0; i< arr.length; i++) {
    for(let j=i+1; j< arr.length; j++) {
      if(arr[i] > arr[j]) {
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
      }
      count ++
    }
    // result.push(arr[i])
  }
  console.log('比较次数',count)
  // count 91
  return arr
}

//1 2 全错 不是冒泡

function bubbling3(arr) {

  console.time('bubbling3耗时');
  let count = 0
  for(let i=0; i< arr.length; i++) {
    for(let j=0; j< arr.length -1 -i; j++) {
      if(arr[j] > arr[j+1]) {
        let tmp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = tmp
      }
      count ++
    }
    // result.push(arr[i])
  }
  console.timeEnd('bubbling3耗时');
  console.log('比较次数',count)
  // count  91
  return arr
}

// bubbling3 最原始的冒泡 
// bubbling4 解决 如果未排序已经是排列好的顺序 就不遍历了
function bubbling4(arr) {
  console.time('bubbling4耗时');
  let count = 0
  for(let i=0; i< arr.length; i++) {
    let flag = true
    for(let j=0; j< arr.length -1 -i; j++) {
      if(arr[j] > arr[j+1]) {
        let tmp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = tmp
        flag = false
      }
      count ++
    }
    if(flag){
      break;
    }
    // result.push(arr[i])
  }
  console.timeEnd('bubbling4耗时');
  console.log('比较次数',count)

  return arr
}

 //设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。
 // 由于pos位置之后的记录均已交换到位,故在进行下一趟排序时i只要扫描到pos位置即可。

function bubbling5(arr) {
  console.time('bubbling5耗时');
  let i = arr.length-1;  //初始时,最后位置保持不变
  let count = 0

  while ( i> 0) {
    let flag = true

    let pos= 0; //每趟开始时,无记录交换
    for (let j= 0; j< i; j++)
        if (arr[j]> arr[j+1]) {
            pos= j; //记录交换的位置
            let tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
            flag = false
        }
        count ++
    
    i= pos; //为下一趟排序作准备
    if(flag){
      break;
    }
   }
   console.timeEnd('bubbling5耗时');
   console.log('比较次数',count)

   return arr;
}

// console.log(bubbling3(arr))
// console.log(bubbling4(arr))
console.log(bubbling5(arr))