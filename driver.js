import { prettyPrint, Tree } from "./bst.js"

function createRandomArray() {
    const array = []
    const arraySize = Math.floor(Math.random() * 25)
    
    for (let i = 0; i < arraySize; i++) {
        const randomNumber = Math.floor(Math.random() * 100)
        array.push(randomNumber)
    }

    return array;
}

const array = createRandomArray()
const tree = new Tree(array)
prettyPrint(tree.root)
console.log(tree.isBalanced())
console.log(tree.levelOrder())
console.log(tree.preOrder())
console.log(tree.postOrder())
console.log(tree.inOrder())
tree.insert(101)
tree.insert(105)
tree.insert(104)
tree.insert(106)
tree.insert(108)
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
console.log(tree.levelOrder())
console.log(tree.preOrder())
console.log(tree.postOrder())
console.log(tree.inOrder())



