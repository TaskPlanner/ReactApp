export const planner = [
  {
    _id: '1',
    name: '10.03.2021',
    data: [
      {
        _id: '1',
        title: 'Example Task',
        type: 'task',
        date: '10.03.2021',
        time: '1 hour',
        iterate: '7 days',
        project: 'Example Project',
        priority: '1',
        comments: [
          {
            _id: '1',
            text: 'Example Comment',
          },
          {
            _id: '2',
            text: 'Example Comment',
          }
        ],
        inbox: true,
      },
      {
        _id: '2',
        title: 'Example Note',
        type: 'note',
        date: '10.03.2021',
        inbox: true,
      },
    ]
  },
  {
    _id: '2',
    name: '11.03.2021',
    data: [
      {
        _id: '3',
        title: 'Example Task',
        type: 'task',
        date: '11.03.2021',
        time: '1 hour',
        iterate: '7 days',
        project: 'Example Project',
        priority: '1',
        comments: [
          {
            _id: 1,
            text: 'Example Comment',
          },
          {
            _id: 2,
            text: 'Example Comment',
          }
        ],
        inbox: true,
      },
      {
        _id: '4',
        title: 'Example Note',
        type: 'note',
        date: '11.03.2021',
        inbox: true,
      },
      {
        _id: '5',
        title: 'Example Task',
        type: 'task',
        date: '11.03.2021',
        inbox: true,
      },
    ]
  },
];
