import { Node } from "./Node"
import { Document } from "./Document"
import { Text } from "./Text"
import { NamedNodeMap } from "./NamedNodeMap"
import { DOMTokenList } from "./DOMTokenList"
import { Attr } from "./Attr";
import { HTMLCollection } from "./HTMLCollection";
import { Utility } from "./Utility";

/**
 * Represents an element node.
 */
export class Element extends Node {

  protected _namespaceURI: string | null
  protected _prefix: string | null
  protected _localName: string
  protected _attributes: NamedNodeMap = new NamedNodeMap()
  
  /**
   * Initializes a new instance of `Element`.
   *
   * @param ownerDocument - the owner document
   * @param namespaceURI - the namespace URI
   * @param prefix - the namespace prefix
   * @param localName - the local name of the element
   */
  public constructor (ownerDocument: Document | null = null, 
    namespaceURI: string | null, prefix: string | null, localName: string) 
  {
    super(ownerDocument)

    this._namespaceURI = namespaceURI
    this._prefix = prefix
    this._localName = localName
  }
  
  /** 
   * Returns the type of node. 
   */
  get nodeType(): number { return Node.Element }

  /** 
   * Returns a string appropriate for the type of node. 
   */
  get nodeName(): string { return this.tagName }

  /** 
   * Gets the namespace URI.
   */
  get namespaceURI(): string | null { return this._namespaceURI }
    
  /** 
   * Gets the namespace prefix.
   */
  get prefix(): string | null { return this._prefix }

  /** 
   * Gets the local name.
   */
  get localName(): string { return this._localName }

  /** 
   * If namespace prefix is not `null`, returns the concatenation of
   * namespace prefix, `":"`, and local name. Otherwise it returns the
   * local name.
   */
  get tagName(): string {
    return (this._prefix ? 
      this._prefix + ':' + this.localName : 
      this.localName)
  }

  /** 
   * Gets or sets the identifier of this element.
   */
  get id(): string { return this.getAttribute('id') || ''}
  set id(value: string) { this.setAttribute('id', value) }

  /** 
   * Gets or sets the class name of this element.
   */
  get className(): string { return this.getAttribute('class') || '' }
  set className(value: string) { this.setAttribute('class', value) }

  /** 
   * Returns a {@link DOMTokenList} with tokens from the class attribute.
   */
  get classList(): DOMTokenList { return new DOMTokenList(this, 'class') }

  /** 
   * Gets or sets the slot attribute of this element.
   */
  get slot(): string { return this.getAttribute('slot') || ''}
  set slot(value: string) { this.setAttribute('slot', value) }

  /** 
   * Returns a {@link NamedNodeMap} of attributes.
   */
  get attributes(): NamedNodeMap { return this._attributes }

  /**
   * Determines if the element node contains any attributes.
   */
  hasAttributes(): boolean { return (this.attributes.length !== 0) }

  /**
   * Returns the list of all attribute's qualified names.
   */
  getAttributeNames(): string[] {
    let names: string[] = []
    
    for(let att of this.attributes) {
      names.push(att.name)
    }

    return names
  }

  /**
   * Returns the value of the attribute with the given `qualifiedName`.
   * 
   * @param qualifiedName - qualified name to search for
   */
  getAttribute(qualifiedName: string): string | null {
    let att = this.attributes.getNamedItem(qualifiedName)
    return (att ? att.value : null)
  }

  /**
   * Returns the value of the attribute with the given `namespace` and 
   * `qualifiedName`.
   * 
   * @param namespace - namespace to search for
   * @param localName - local name to search for
   */
  getAttributeNS(namespace: string, localName: string): string | null {
    let att = this.attributes.getNamedItemNS(namespace, localName)
    return (att ? att.value : null)
  }
  
  /**
   * Sets the value of the attribute with the given `qualifiedName`.
   * 
   * @param qualifiedName - qualified name to search for
   * @param value - attribute value to set
   */
  setAttribute(qualifiedName: string, value: string): void {
    let att = this.attributes.getNamedItem(qualifiedName)
    if (att) att.value = value
  }

  /**
   * Sets the value of the attribute with the given `namespace` and 
   * `qualifiedName`.
   * 
   * @param namespace - namespace to search for
   * @param localName - local name to search for
   * @param value - attribute value to set
   */
  setAttributeNS(namespace: string, localName: string, value: string): void {
    let att = this.attributes.getNamedItemNS(namespace, localName)
    if (att) att.value = value
  }

  /**
   * Removes the attribute with the given `qualifiedName`.
   * 
   * @param qualifiedName - qualified name to search for
   */
  removeAttribute(qualifiedName: string): void {
    try {
      this.attributes.removeNamedItem(qualifiedName)
    } catch(e) {
      if (e.name !== "NotFoundError")
        throw e
    }
  }

  /**
   * Removes the attribute with the given `namespace` and 
   * `qualifiedName`.
   * 
   * @param namespace - namespace to search for
   * @param localName - local name to search for
   */
  removeAttributeNS(namespace: string, localName: string): void {
    try {
      this.attributes.removeNamedItemNS(namespace, localName)
    } catch(e) {
      if (e.name !== "NotFoundError")
        throw e
    }
  }

  /**
   * Determines whether the attribute with the given `qualifiedName`
   * exists.
   * 
   * @param qualifiedName - qualified name to search for
   */
  hasAttribute(qualifiedName: string): boolean {
    for(let att of this.attributes) {
      if (att.name === qualifiedName)
        return true
    }

    return false
  }

  /**
   * Determines whether the attribute with the given `namespace` and 
   * `qualifiedName` exists.
   * 
   * @param namespace - namespace to search for
   * @param localName - local name to search for
   */
  hasAttributeNS(namespace: string, localName: string): boolean {
    for(let att of this.attributes) {
      if (att.namespaceURI === namespace && att.localName === localName)
        return true
    }

    return false
  }

  /**
   * Returns the attribute with the given `qualifiedName`.
   * 
   * @param qualifiedName - qualified name to search for
   */
  getAttributeNode(qualifiedName: string): Attr | null {
    return this.attributes.getNamedItem(qualifiedName)
  }

  /**
   * Returns the attribute with the given `namespace` and 
   * `qualifiedName`.
   * 
   * @param namespace - namespace to search for
   * @param localName - local name to search for
   */
  getAttributeNodeNS(namespace: string, localName: string): Attr | null {
    return this.attributes.getNamedItemNS(namespace, localName)
  }

  /**
   * Sets the attribute given with `attr`.
   * 
   * @param attr - attribute to set
   */
  setAttributeNode(attr: Attr): Attr | null {
    return this.attributes.setNamedItem(attr)
  }

  /**
   * Sets the attribute given with `attr`.
   * 
   * @param attr - attribute to set
   */
  setAttributeNodeNS(attr: Attr): Attr | null {
    return this.attributes.setNamedItemNS(attr)
  }

  /**
   * Removes the given attribute.
   * 
   * @param attr - attribute to remove
   */
  removeAttributeNode(attr: Attr): Attr {
    return this.attributes.removeNamedItemNS(attr.namespaceURI || '', attr.localName)
  }

  /** 
   * Returns the concatenation of data of all the {@link CharacterData}
   * node descendants in tree order. When set, replaces the text 
   * contents of the node with the given value. 
   */
  get textContent(): string | null {
    let str = ''
    for (let child of this._childNodeList) {
      let childContent = child.textContent
      if (childContent) str += childContent
    }
    return str
  }
  set textContent(value: string | null) {
    let node: Node | null = null
    if (value)
      node = new Text(this.ownerDocument, value)

    if(node && this.ownerDocument)
      this.ownerDocument.adoptNode(node)
    
    this.childNodes.length = 0
    
    if (node)
      node.appendChild(node)
  }

  /**
   * Returns a duplicate of this node, i.e., serves as a generic copy 
   * constructor for nodes. The duplicate node has no parent 
   * ({@link parentNode} returns `null`).
   *
   * @param document - new owner document
   * @param deep - if `true`, recursively clone the subtree under the 
   * specified node; if `false`, clone only the node itself (and its 
   * attributes, if it is an {@link Element}).
   */
  cloneNode(document: Document | boolean | null = null,
    deep: boolean = false): Node {

    if (typeof document === "boolean") {
      deep = document
      document = null
    }

    if(!document)
      document = this.ownerDocument
      
    let clonedSelf = new Element(document, 
      this.namespaceURI, this.prefix, this.localName)
    clonedSelf._parentNode = null

    // clone attributes
    for(let att of this.attributes) {
      let clonedAtt = new Attr(clonedSelf, 
        att.namespaceURI, att.prefix, att.localName, att.value)
      clonedSelf.attributes.setNamedItem(clonedAtt)
    }

    // clone child nodes
    for(let child of this.childNodes) {
      let clonedChild = child.cloneNode(document, deep)
      clonedSelf.appendChild(clonedChild)
    }

    return clonedSelf
  }


  /**
   * Determines if the given node is equal to this one.
   * 
   * @param node - the node to compare with
   */
  isEqualNode(node?: Node | null): boolean {
    if (!super.isEqualNode(node))
      return false

    let other = <Element>node
    if(!other || this.namespaceURI !== other.namespaceURI || 
      this.prefix !== other.prefix ||
      this.localName !== other.localName ||
      this.attributes.length !== other.attributes.length) {
      return false
    } else {
      for (let i = 0; i < this.attributes.length; i++) {
        let att1 = this.attributes[i]
        let att2 = other.attributes[i]
        if (att1.namespaceURI !== att2.namespaceURI ||
          att1.localName !== att2.localName ||
          att1.value !== att2.value) {
          return false
        }
      }
      
      return true
    }
  }

  /**
   * Returns a {@link HTMLCollection} of all descendant elements 
   * whose qualified name is `qualifiedName`.
   * 
   * @param qualifiedName - the qualified name to match or `*` to match
   * all descendant elements.
   * 
   * @returns an {@link HTMLCollection} of matching descendant
   * elements
   */
  getElementsByTagName (qualifiedName: string): HTMLCollection {
    let matchAll = (qualifiedName == '*')

    let list = new HTMLCollection()

    Utility.forEachDescendant (this, function(node: Node) {
      if (node.nodeType === Node.Element) {
        let ele = <Element>node
        if (matchAll || ele.tagName === qualifiedName)
          list.push(ele)
      }
    })

    return list
  }

  /**
   * Returns a {@link HTMLCollection} of all descendant elements 
   * whose namespace is `namespace` and local name is `localName`.
   * 
   * @param namespace - the namespace to match or `*` to match any
   * namespace.
   * @param localName - the local name to match or `*` to match any
   * local name.
   * 
   * @returns an {@link HTMLCollection} of matching descendant
   * elements
   */
  getElementsByTagNameNS (namespace: string, localName: string): HTMLCollection {
    let matchAllNamespace = (namespace == '*')
    let matchAllLocalName = (localName == '*')

    let list = new HTMLCollection()

    Utility.forEachDescendant (this, function(node: Node) {
      if (node.nodeType === Node.Element) {
        let ele = <Element>node
        if ((matchAllLocalName || ele.localName === localName) &&
            (matchAllNamespace || ele.namespaceURI === namespace))
          list.push(ele)
      }
    })

    return list
  }

  /**
   * Returns a {@link HTMLCollection} of all descendant elements 
   * whose classes are contained in the list of classes given in 
   * `classNames`.
   * 
   * @param classNames - a space-separated list of classes
   * 
   * @returns an {@link HTMLCollection} of matching descendant
   * elements
   */
  getElementsByClassName (classNames: string): HTMLCollection {
    let list = new HTMLCollection()

    let arr = DOMTokenList.TokenArrayFromString(classNames)
    Utility.forEachDescendant (this, function(node: Node) {
      if (node.nodeType === Node.Element) {
        let ele = <Element>node
        let classes = ele.classList
        let allClassesFound = true
        for (let className of arr) {
          if (!classes.contains(className)) {
            allClassesFound = false
            break
          }
        }
        if (allClassesFound)
          list.push(ele)
      }
    })

    return list
  }
}