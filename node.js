/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes, id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of child nodes.
    this.children = children; // All children are of type Node
    // id
    this.id = id;
  }

  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  *
  * 3.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <article>
  *     <div>
  *       <span id="span-3"></span>
  *     </div>
  *   </article>
  * </div>
  * Selector `div span` should return three span nodes in this order
  * span-1 -> span-2 -> span-3.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  //   search(selector){
  // console.log("it worked");
  //   }


  //new one

  search(selector) {

    if (selector !== undefined) {

      let dot = ".";
      let hash = "#"
      var nodes = []; //This array will be used to store all the matching nodes
      let root_node = this; //This is the root element

      if (root_node != null) {

        var queue = []; //empty queue
        queue.unshift(root_node); // This pushes the element into the queue

        while (queue.length != 0) { 
          var item = queue.shift();   //This pops the node from the queue and stores it in item

          if (item != undefined) {
            var children = item.children;  //This will give the children of the item
          }

          // This section comapre the nodes with the selector and stores the result
          //console.log(hash.concat(item.id), " ", selector);
          if (item.tag === selector) {
            if(item.id !== this.id) {
              nodes.push(item);
            }
          }
          else if (selector.indexOf('.') !== -1) {
            for (i = 0; i < item.classes.length; i++) {
              if (dot.concat(item.classes[i]) == selector) {
                if(item.id !== this.id) {
                  nodes.push(item);
                }
              }
            }
          }
          else if (hash.concat(item.id) === selector) {
            nodes.push(item.children);
          }

          // This loop  stores the children of current node
          for (var i = 0; i < children.length; i++) {
            //console.log(children[i], "-----abc", i);
            queue.push(children[i]);
          }
        }

        if (nodes.length === 0) {
          console.log("No nodes found");
        }
        else {
          return nodes;
        }
      }
    }
    else {
      console.log("Invalid Entry");
    }
  }
}

//Declaration of Nodes with respect to given DOM tree
let span1 = new Node("span", [], ["note"], "span-1");
let span2 = new Node("span", [], [], "span-2");
let span3 = new Node("span", [], ["sub1-span3"], "span-3");
let span4 = new Node("span", [], ["mania"], "span-4");
let span5 = new Node("span", [], ["note", "mania"], "span-5");
let randomNode = new Node("span", [], ["randomSpan"], "span-6");
let p1 = new Node("p", [], ["sub1-p1", "note"], "para-1");
let label1 = new Node("label", [], [], "lbl-1");
let section1 = new Node("section", [label1], [], "sec-1");
let divNode4 = new Node("div", [span4, span5], [], "div-4");
let divNode3 = new Node("div", [section1], ["subContainer2"], "div-3");
let divNode2 = new Node("div", [p1, span3], ["subContainer1"], "div-2");
let divNode1 = new Node("div", [span1, span2, divNode2, divNode3, divNode4], ["mainContainer"], "div-1");
let body = new Node("body", [divNode1, randomNode], [], "content");

let result = divNode1.search(".note");

if(result !== undefined) {
  console.log(result);
}
