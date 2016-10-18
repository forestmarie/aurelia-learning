import {processContent, inject} from 'aurelia-framework';

@inject(Element)

// this allows you to plug in to Aurelia'a HTML compiler.  In this case,
// we are providing a method.
@processContent(parseColumns)
export class DataGrid {
  constructor(element) {
    this.element = element;
    this.onResize = () => this.size();
  }

  bind() {
    window.addEventListener('resize', this.onResize);
  }

  attached() {
    this.headerCells = this.element.getElementsByClassName('header-row')[0].children;
    this.sizingCells = this.element.getElementsByClassName('sizing-row')[0].children;
    this.size();
  }

  unbind() {
    window.removeEventListener('resize', this.onResize);
  }

  size() {
    for (let i = 0, ii = this.headerCells.length - 1; i < ii; ++i) {
      this.sizingCells[i].style.width = this.headerCells[i].offsetWidth + 'px';
    }
  }
}

// All of these args are provided via processContent.
// compiler: HTML compiler
// resources: ViewResources - has all the custom elements and attributes that
//   are inside of the current view.
// node - what's being compiled - in this case it's the <data-grid> declaration.
// instruction - compiler instruction.
function parseColumns(compiler, resources, node, instruction) {
  let columns = node.querySelectorAll('grid-column');
  let headerCells = '';
  let dataCells = '';
  let sizingCells = '';
  let itemsExpression = node.getAttribute('items.bind');

  node.removeAttribute('items.bind');

  for (let i = 0, ii = columns.length; i < ii; ++i) {
    let column = columns[i];
    let cellTemplate;

    headerCells += '<th>' + column.getAttribute('heading') + '</th>';
    sizingCells += '<td></td>';

    // This grabs the HTML inside of the <grid-column></grid-column> declarations.
    cellTemplate = column.innerHTML.trim();

    // If there is content there, that's what we put in the HTML.
    if (cellTemplate) {
      dataCells += '<td>' + cellTemplate + '</td>';
    } else {
      // macro-programming a custom element here.
      // In cases with no content, we're just going to render that property
      // with an interpolation syntax.
      dataCells += '<td>${item.' + column.getAttribute('property') + '}</td>';
    }
  }

  // This will replace everything wtihin the <data-grid> declaration
  // At the end of the day, Aurelia will NEVER see anything inside of the <data-grid>
  // declaration.  It'll only see this new content and think won't even know it's
  // not hand-written in HTML inside of a template.
  node.innerHTML = `
  <table class="grid-header table">
    <thead>
      <tr class="header-row">${headerCells}</tr>
    </thead>
  </table>
  <div class="grid-container">
    <table class="grid-rows table table-striped">
      <tbody>
        <tr class="sizing-row">${sizingCells}</tr>
        <tr repeat.for="item of ${itemsExpression}" class="item-row">${dataCells}</tr>
      </tbody>
    </table>
  </div>
  `;

  // This return true tells the compiler to process this new content.
  return true;
}
