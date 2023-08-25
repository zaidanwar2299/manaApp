import icons from '../assets/icons';
import theme from './theme';

export const ErrorMessages = {
  Password: 'Password length must be atleast 6 characters.',
  Name: 'Numbers or special characters are not allowed.',
};

export const SchemaKeys = {
  First_Name: '(First name)',
  Last_Name: '(Last name)',
  Email: '(Email address)',
  Password: '(Password)',
  New_Password: '(New password)',
};

export const Appointment = [
  {
    id: 1,
    name: 'Work Calendar',
    color: theme.pink,
  },
  {
    id: 1,
    name: 'Travel Calendar',
    color: theme.green,
  },
];

export const AppointmentCalendar = [
  {
    id: 1,
    name: 'Work Calendar',
    color: theme.pink,
    members: '8',
  },
  {
    id: 1,
    name: 'Travel Calendar',
    color: theme.green,
    members: '20',
  },
];

export const ContactList = [
  {
    id: 1,
    profilePic: null,
    name: 'Mario Mourad',
  },
  {
    id: 2,
    profilePic: null,
    name: 'Savannah Nguyen',
    added: false,
  },
  {
    id: 3,
    profilePic: null,
    name: 'Guy Hawkins',
    added: false,
  },
  {
    id: 4,
    profilePic: null,
    name: 'Mario Mourad',
    added: false,
  },
  {
    id: 5,
    profilePic: null,
    name: 'Jane Cooper',
    added: false,
  },
  {
    id: 6,
    profilePic: null,
    name: 'Peter Grover-Pickford',
    added: false,
  },
  {
    id: 7,
    profilePic: null,
    name: 'Guy Hawkins',
    added: false,
  },
  {
    id: 8,
    profilePic: null,
    name: 'Mario Mourad',
    added: false,
  },
  {
    id: 9,
    profilePic: null,
    name: 'Jane Cooper',
    added: false,
  },
  {
    id: 10,
    profilePic: null,
    name: 'Peter Grover-Pickford',
    added: false,
  },
];

export const ContactAddedList = [
  {
    id: 1,
    profilePic: null,
    name: 'Mario Mourad',
    tag: '@Mario',
    added:false,
  },
  {
    id: 2,
    profilePic: null,
    name: 'Savannah Nguyen',
    tag: '@Savannah',
    added: false,
  },
  {
    id: 3,
    profilePic: null,
    name: 'Guy Hawkins',
    tag: '@Guy',
    added: false,
  },
  {
    id: 4,
    profilePic: null,
    name: 'Mario Mourad',
    tag: '@Mario',
    added: false,
  },
  {
    id: 5,
    profilePic: null,
    name: 'Jane Cooper',
    tag: '@Jane',
    added: false,
  },
  {
    id: 6,
    profilePic: null,
    name: 'Peter Grover-Pickford',
    tag: '@Grover',
    added: false,
  },
  {
    id: 7,
    profilePic: null,
    name: 'Guy Hawkins',
    tag: '@Guy',
    added: false,
  },
  {
    id: 8,
    profilePic: null,
    name: 'Mario Mourad',
    tag: '@Mario',
    added: false,
  },
  {
    id: 9,
    profilePic: null,
    name: 'Jane Cooper',
    tag: '@Jane',
    added: false,
  },
  {
    id: 10,
    profilePic: null,
    name: 'Peter Grover-Pickford',
    tag: '@Grover',
    added: false,
  },
];

export const ProfileList = [
  {
    id:1,
    image: icons.profile1
  },
  {
    id:2,
    image: icons.profile2
  },
  {
    id:3,
    image: icons.profile3
  },
  {
    id:4,
    image: icons.profile4
  },
  {
    id:5,
    image: icons.profilePhoto
  },

]


export const calendarList = [
  {
    id:1,
    name:"Work Calendar",
    members:8,
    color: theme.pink,
  },
  {
    id:2,
    name:"Travel Calendar",
    members:20,
    color: theme.green,
  },
  {
    id:3,
    name:"Calendar group with a long name",
    members:0,
    color: theme.blue,
  },
]