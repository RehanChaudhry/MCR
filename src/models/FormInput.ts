export const Sections = [
  {
    title: "Basic Profile",
    description:
      "This information will be displayed publicly so be careful what you share.",
    formInputs: [
      {
        id: 0,
        //fieldName: "firstName",
        //label: "First Name",
        inputType: "uploadphoto"
        // userMeta: [],
        // placeholder: "Enter Your First Name"
      },
      {
        id: 1,
        name: "firstName",
        label: "First Name",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Enter Your First Name",
        isRequired: 1
      },
      {
        id: 2,
        name: "lastName",
        label: "Last Name",
        inputType: "textfield",
        isRequired: 1,
        userMeta: [],
        placeholder: "Enter Your Last Name"
      },
      {
        id: 3,
        name: "aboutMe",
        label: "About Me",
        inputType: "textarea",
        isRequired: 0,
        userMeta: [],
        placeholder: "Brief description for your profile."
      },
      {
        id: 4,
        name: "faceBookProfile",
        label: "Facebook Profile",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "facebook.com/"
      },
      {
        id: 5,
        name: "twitterProfile",
        label: "Twitter Profile",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "twitter.com/"
      },
      {
        id: 6,
        name: "linkedInProfile",
        label: "LinkedIn Profile",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "linkedin.com/"
      },
      {
        id: 7,
        name: "snapChatProfile",
        label: "SnapChat Profile",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "snapchat.com/"
      },
      {
        id: 8,
        name: "tikTokProfile",
        label: "TikTok Profile",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "tiktok.com/"
      }
    ]
  },
  {
    title: "Demographics",
    description: "Please take a moment to tell us more about you.",
    formInputs: [
      {
        id: 9,
        label: "Gender",
        name: "gender",
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
        placeholder: "Select your gender"
      },
      {
        id: 10,
        label: "Smoking habits",
        name: "smokingHabits",
        inputType: "radio",
        isRequired: 0,
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
        id: 11,
        name: "homeTown",
        label: "Hometown",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "Enter your hometown"
      },
      {
        id: 12,
        name: "intendedMajor",
        label: "Intended Major",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "Enter your intended major"
      }
    ]
  },
  {
    title: "Interests",
    description: "Tell us about what do you love to do?",
    formInputs: [
      {
        id: 13,
        label: "Hobbies & interests",
        name: "hobbies",
        inputType: "multiselect",
        isRequired: 0,
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
        id: 14,
        label: "Club & Memberships",
        name: "memberships",
        inputType: "multiselect",
        isRequired: 0,
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
        label: "Favorite movies & TV shows",
        inputType: "multiselect",
        isRequired: 0,
        name: "movies",

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
        label: "Music",
        inputType: "multiselect",
        isRequired: 0,
        name: "music",

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
        label: "Books",
        inputType: "multiselect",
        isRequired: 0,
        name: "books",

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
        id: 18,
        label: "Games",
        inputType: "multiselect",
        isRequired: 0,
        name: "games",

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
        id: 19,
        label: "Student ID",
        name: "studentID",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [
          {
            value: "123456"
          }
        ]
      },
      {
        id: 20,
        label: "Programs",
        name: "programs",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "Enter your educational program"
      },
      {
        id: 21,
        name: "community",
        label: "Community",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "Start typing seprated by comma"
      },
      {
        id: 22,
        name: "building",
        label: "Building",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "Enter your building information"
      },
      {
        id: 23,
        name: "room",
        label: "Room",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "Enter your room number"
      }
    ]
  },
  {
    title: "Video Introduction",
    description:
      "Record 60 seconds self-introduction video presentation and post it on YouTube.",
    formInputs: [
      {
        id: 24,
        name: "youtubeVideoUrl",
        label: "YouTube Video URL",
        inputType: "textfield",
        isRequired: 0,
        userMeta: [],
        placeholder: "youtube.com/"
      }
    ]
  }
];
