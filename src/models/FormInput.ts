export const Sections = [
  {
    title: "Basic Profile",
    description:
      "This information will be displayed publicly so be careful what you share.",
    formInputs: [
      {
        id: 0,
        label: "First Name",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Enter Your First Name"
      },
      {
        id: 1,
        label: "Last Name",
        inputType: "textfield",
        userMeta: [],
        placeHolder: "Enter Your Last Name"
      },
      {
        id: 2,
        label: "About Me",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Brief description for your profile."
      },
      {
        id: 3,
        label: "Facebook Profile",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "facebook.com/"
      },
      {
        id: 4,
        label: "Twitter Profile",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "twitter.com/"
      },
      {
        id: 5,
        label: "LinkedIn Profile",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "linkedin.com/"
      },
      {
        id: 6,
        label: "SnapChat Profile",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "snapchat.com/"
      },
      {
        id: 7,
        label: "TikTok Profile",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "tiktok.com/"
      }
    ]
  },
  {
    title: "Demographics",
    description: "Please take a moment to tell us more about you.",
    formInputs: [
      {
        id: 8,
        label: "Gender",
        inputType: "dropdown",
        options: [
          {
            id: 0,
            value: "male"
          },
          {
            id: 1,
            value: "female"
          },
          {
            id: 2,
            value: "others"
          }
        ],
        placeHolder: "Select your gender"
      },
      {
        id: 9,
        label: "Smoking habits",
        inputType: "radio",
        options: [
          {
            id: 0,
            value: "Never"
          },
          {
            id: 1,
            value: "Occasionally"
          },
          {
            id: 2,
            value: "Frequently"
          }
        ]
      },
      {
        id: 10,
        label: "Hometown",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Enter your hometown"
      },
      {
        id: 11,
        label: "Intended Major",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Enter your intended major"
      }
    ]
  },
  {
    title: "Interests",
    description: "Tell us about what do you love to do?",
    formInputs: [
      {
        id: 12,
        label: "Hobbies & interests",
        inputType: "multiselect",
        options: [
          {
            id: 0,
            value: "Debate club"
          },
          {
            id: 1,
            value: "Environment Protection Society"
          },
          {
            id: 2,
            value: "GoldReel Acting and Filmmaking Society"
          },
          {
            id: 3,
            value: "History Society"
          },
          {
            id: 4,
            value: "IAESTE"
          },
          {
            id: 5,
            value: "Vegan Society"
          }
        ]
      },
      {
        id: 13,
        label: "Club & Memberships",
        inputType: "multiselect",
        options: [
          {
            id: 0,
            value: "Drunk In Love forever"
          },
          {
            id: 1,
            value: "Heathens"
          },
          {
            id: 2,
            value: 'Love Me Harder" by Ariana Grande ft. The Weeknd'
          }
        ]
      },
      {
        id: 14,
        label: "Favorite movies & TV shows",
        inputType: "multiselect",
        options: [
          {
            id: 0,
            value: "Drunk In Love forever"
          },
          {
            id: 1,
            value: "Heathens"
          },
          {
            id: 2,
            value: 'Love Me Harder" by Ariana Grande ft. The Weeknd'
          }
        ]
      },
      {
        id: 15,
        label: "Music",
        inputType: "multiselect",
        options: [
          {
            id: 0,
            value: "Drunk In Love forever"
          },
          {
            id: 1,
            value: "Heathens"
          },
          {
            id: 2,
            value: 'Love Me Harder" by Ariana Grande ft. The Weeknd'
          }
        ]
      },
      {
        id: 16,
        label: "Books",
        inputType: "multiselect",
        options: [
          {
            id: 0,
            value: "Drunk In Love forever"
          },
          {
            id: 1,
            value: "Heathens"
          },
          {
            id: 2,
            value: 'Love Me Harder" by Ariana Grande ft. The Weeknd'
          }
        ]
      },
      {
        id: 17,
        label: "Games",
        inputType: "multiselect",
        options: [
          {
            id: 0,
            value: "Drunk In Love forever"
          },
          {
            id: 1,
            value: "Heathens"
          },
          {
            id: 2,
            value: 'Love Me Harder" by Ariana Grande ft. The Weeknd'
          }
        ]
      }
    ]
  },
  {
    title: "Living Details",
    description:
      "Please provide your educational information to complete your profile.",
    formInputs: [
      {
        id: 18,
        label: "Student ID",
        inputType: "textarea",
        userMeta: [
          {
            value: "123456"
          }
        ]
      },
      {
        id: 19,
        label: "Programs",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Enter your educational program"
      },
      {
        id: 20,
        label: "Community",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Start typing seprated by comma"
      },
      {
        id: 21,
        label: "Building",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Enter your building information"
      },
      {
        id: 22,
        label: "Room",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "Enter your room number"
      }
    ]
  },
  {
    title: "Video Introduction",
    description:
      "Record 60 seconds self-introduction video presentation and post it on YouTube.",
    formInputs: [
      {
        id: 23,
        label: "YouTube Video URL",
        inputType: "textarea",
        userMeta: [],
        placeHolder: "youtube.com/"
      }
    ]
  }
];
