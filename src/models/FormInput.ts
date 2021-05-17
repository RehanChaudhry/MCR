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
        id: 0,
        name: "firstName",
        label: "First Name",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Enter Your First Name"
      },
      {
        id: 1,
        name: "lastName",
        label: "Last Name",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Enter Your Last Name"
      },
      {
        id: 2,
        name: "aboutMe",
        label: "About Me",
        inputType: "textarea",
        userMeta: [],
        placeholder: "Brief description for your profile."
      },
      {
        id: 3,
        name: "faceBookProfile",
        label: "Facebook Profile",
        inputType: "textfield",
        userMeta: [],
        placeholder: "facebook.com/"
      },
      {
        id: 4,
        name: "twitterProfile",
        label: "Twitter Profile",
        inputType: "textfield",
        userMeta: [],
        placeholder: "twitter.com/"
      },
      {
        id: 5,
        name: "linkedInProfile",
        label: "LinkedIn Profile",
        inputType: "textfield",
        userMeta: [],
        placeholder: "linkedin.com/"
      },
      {
        id: 6,
        name: "snapChatProfile",
        label: "SnapChat Profile",
        inputType: "textfield",
        userMeta: [],
        placeholder: "snapchat.com/"
      },
      {
        id: 7,
        name: "tikTokProfile",
        label: "TikTok Profile",
        inputType: "textfield",
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
        id: 8,
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
        id: 9,
        label: "Smoking habits",
        name: "smokingHabits",
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
        name: "homeTown",
        label: "Hometown",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Enter your hometown"
      },
      {
        id: 11,
        name: "intendedMajor",
        label: "Intended Major",
        inputType: "textfield",
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
        id: 12,
        label: "Hobbies & interests",
        name: "hobbies",
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
        name: "memberships",
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
        id: 15,
        label: "Music",
        inputType: "multiselect",
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
        id: 16,
        label: "Books",
        inputType: "multiselect",
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
        id: 17,
        label: "Games",
        inputType: "multiselect",
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
        id: 18,
        label: "Student ID",
        name: "studentID",
        inputType: "textfield",
        userMeta: [
          {
            value: "123456"
          }
        ]
      },
      {
        id: 19,
        label: "Programs",
        name: "programs",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Enter your educational program"
      },
      {
        id: 20,
        name: "community",
        label: "Community",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Start typing seprated by comma"
      },
      {
        id: 21,
        name: "building",
        label: "Building",
        inputType: "textfield",
        userMeta: [],
        placeholder: "Enter your building information"
      },
      {
        id: 22,
        name: "room",
        label: "Room",
        inputType: "textfield",
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
        id: 23,
        name: "youtubeVideoUrl",
        label: "YouTube Video URL",
        inputType: "textfield",
        userMeta: [],
        placeholder: "youtube.com/"
      }
    ]
  }
];
