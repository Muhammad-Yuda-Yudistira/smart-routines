const newSteps = [
  {
    id: 'step1',
    attachTo: {
      element: '#step-1',
      on: 'top',
    },
    title: 'Step 1 of 3.',
    text: 'What is this?',
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
  },
  {
    id: 'step2',
    attachTo: {
      element: '#step-2',
      on: 'right',
    },
    title: 'Step 2 of 3.',
    text: 'Check how to create effective your schedule!',
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
  },
  {
    id: 'step3',
    attachTo: {
      element: '#section-2',
      on: 'top',
    },
    title: 'Step 3 of 3',
    text: 'Register and login for use this!',
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Finish',
        type: 'next'
      }
    ],
  }
];

export default newSteps;
