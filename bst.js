class Node {
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    const mid = Math.floor(sortedArray.length / 2);
    const node = new Node(sortedArray[mid]);

    if (sortedArray.length === 0) return null;

    node.leftNode = this.buildTree(sortedArray.slice(0, mid));
    node.rightNode = this.buildTree(sortedArray.slice(mid + 1));

    return node;
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value === node.value) return node;

    if (value > node.value) {
      node.rightNode = this.insert(value, node.rightNode);
    } else {
      node.leftNode = this.insert(value, node.leftNode);
    }

    return node;
  }

  findMinValue(node) {
    let minVal = node.value;

    while (node.leftNode !== null) {
      minVal = node.leftNode.value;
      node = node.leftNode;
    }

    return minVal;
  }

  #deleteNodeHelper(node) {
    if (node.leftNode && node.rightNode) {
      const nextSmallestNode = this.findMinValue(node.rightNode);

      node.value = nextSmallestNode;
      node.rightNode = this.delete(nextSmallestNode, node.rightNode);

      return node;
    } else {
      const replacementNode = node.rightNode || node.leftNode;
      node = null;
      return replacementNode;
    }
  }

  delete(value, node = this.root) {
    if (node === null) return node;

    if (node.value === value) {
      node = this.#deleteNodeHelper(node);
    } else if (node.value < value) {
      node.rightNode = this.delete(value, node.rightNode);
    } else {
      node.leftNode = this.delete(value, node.leftNode);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (node.value !== value) {
      return node.value < value
        ? this.find(value, node.rightNode)
        : this.find(value, node.leftNode);
    }
    return console.log(node);
  }

  // Level Order Traversal || Breadth First Traversal
  // Uses a Queue (First In, First Out)

  levelOrder(callbackFn) {
    if (!this.root) return [];

    const queue = [this.root];
    const finalResults = []

    while (queue.length) {
      let levelResults = []
      for (let i = 0; i < queue.length; i++) {
        const currentNode = queue.shift();
        levelResults.push(currentNode.value)

        if (currentNode.leftNode) queue.push(currentNode.leftNode)
        if (currentNode.rightNode) queue.push(currentNode.rightNode)
        if (callbackFn) callbackFn(currentNode)
      }
      finalResults.push(...levelResults)
    }
    if (!callbackFn) return finalResults
  }

  preOrder(callbackFn) {
    if (!this.root) return []

    const stack = [this.root]
    const preOrderResults = []
    
    while (stack.length) {
      const currentNode = stack.pop()

      if (currentNode.rightNode) stack.push(currentNode.rightNode)
      if (currentNode.leftNode) stack.push(currentNode.leftNode)
      if (callbackFn) callbackFn(currentNode)

      preOrderResults.push(currentNode.value)
    }
    if (!callbackFn) return preOrderResults
  }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root)
console.log(tree.preOrder())
