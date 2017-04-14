var list = ['a', 'b', 'c'];
var tree = (
  <div>
    <h1>Hello World</h1>
    {list.map(x => <li key={x}>{x}</li>)}
  </div>
);


var tree = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: { children: 'Hello World' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a' } },
        { type: 'li', key: 'b', props: { children: 'b' } },
        { type: 'li', key: 'c', props: { children: 'c' } },
      ]
    ]
  }
};


var list = ['a', 'b', 'c'];
var tree = (
  <div>
    <h1>Hello World</h1>
    {list.map(x => <li key={x}>{x}</li>)}
    <div>foo</div>
    {list.map(x => <li key={x}>{x}</li>)}
  </div>
);

var tree = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: { children: 'Hello World' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a' } },
        { type: 'li', key: 'b', props: { children: 'b' } },
        { type: 'li', key: 'c', props: { children: 'c' } },
      ],
      {
        type: 'div',
        props: { children: 'foo' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a' } },
        { type: 'li', key: 'b', props: { children: 'b' } },
        { type: 'li', key: 'c', props: { children: 'c' } },
      ],
    ]
  }
};



var list = ['a', 'c', 'd'];
var tree = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: { children: 'Hello World' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a' } },
        { type: 'li', key: 'c', props: { children: 'c' } },
        { type: 'li', key: 'd', props: { children: 'd' } },
      ],
      {
        type: 'div',
        props: { children: 'foo' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a' } },
        { type: 'li', key: 'c', props: { children: 'c' } },
        { type: 'li', key: 'd', props: { children: 'd' } },
      ],
    ]
  }
};
var operations = [
  ['remove', '0.1.b'],
  ['remove', '0.3.b'],
  ['insert', '0.1.d', 2],
  ['insert', '0.3.b', 2],
];



var tree = (
  <div>
    <h1>Hello World</h1>
    {list.map(x => <li key={x}>{x + '!'}</li>)}
    <div>foo</div>
    {list.map(x => <li key={x}>{x}</li>)}
  </div>
);

var tree = {
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: { children: 'Hello World' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a!' } },
        { type: 'li', key: 'c', props: { children: 'c!' } },
        { type: 'li', key: 'd', props: { children: 'd!' } },
      ],
      {
        type: 'div',
        props: { children: 'foo' },
      },
      [
        { type: 'li', key: 'a', props: { children: 'a' } },
        { type: 'li', key: 'c', props: { children: 'c' } },
        { type: 'li', key: 'd', props: { children: 'd' } },
      ],
    ]
  }
};

var operations = [
  ['update', '0.1.a', { children: 'a!' }],
  ['update', '0.1.c', { children: 'c!' }],
  ['update', '0.1.d', { children: 'd!' }],
];
