const queue: number[] = [];

queue.push(1);
queue.push(2);
queue.push(3);
queue.shift();
queue.push(4);
queue.push(5);

console.log(queue); // [2, 3, 4, 5]
