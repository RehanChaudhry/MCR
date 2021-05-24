export const sections = [
  {
    title: "Basic Profile",
    description: "User profile setting.",
    icon: "",
    formInputs: [
      {
        id: 1,
        label: "Profile Picture",
        inputType: "file",
        options: [],
        placeholder: "",
        userMeta: [
          {
            value:
              '{"fileURL":"https://randomuser.me/api/portraits/women/1.jpg","originalName":"1.jpg"}'
          }
        ]
      },
      {
        id: 2,
        label: "First Name",
        inputType: "text",
        options: [],
        placeholder: "Start typing",
        userMeta: [
          {
            value: "Muhammad"
          }
        ]
      },
      {
        id: 3,
        label: "Last Name",
        inputType: "text",
        options: [],
        placeholder: "Start typing",
        userMeta: [
          {
            value: "Zeeshan"
          }
        ]
      },
      {
        id: 4,
        label: "About me",
        inputType: "text",
        options: [],
        placeholder: "Brief description for your profile",
        userMeta: [
          {
            value:
              "I am a Liberal Arts student. I am more into drama than my life is dramatic, get it? Theatre-nerd here, and probably would make you one too. At least we can watch some oldie cinema together. I love trying new things. I'm worthwhile company, so brace yourselves for unlimited fun and party."
          },
          {
            value:
              "I am an Interior Architecture major who also likes to play the bass guitar. I am kind of introverted but once we get to know each other, I will be your best friend."
          }
        ]
      },
      {
        id: 5,
        label: "Facebook profile",
        inputType: "text",
        options: [],
        placeholder: "facebook.com/",
        userMeta: []
      },
      {
        id: 6,
        label: "Twitter profile",
        inputType: "text",
        options: [],
        placeholder: "twitter.com/",
        userMeta: []
      },
      {
        id: 7,
        label: "Linkedin profile",
        inputType: "text",
        options: [],
        placeholder: "linkedin.com/",
        userMeta: []
      },
      {
        id: 8,
        label: "Instagram profile",
        inputType: "text",
        options: [],
        placeholder: "instagram.com/",
        userMeta: []
      }
    ]
  },
  {
    title: "Demographics",
    description: "User profile setting.",
    icon: "",
    formInputs: [
      {
        id: 11,
        label: "Gender",
        inputType: "dropdown",
        options: [
          {
            text: "Male",
            value: "Male"
          },
          {
            text: "Female",
            value: "Female"
          },
          {
            text: "Other",
            value: "Other"
          }
        ],
        placeholder: "Select your gender",
        userMeta: [
          {
            value: "Male"
          }
        ]
      },
      {
        id: 12,
        label: "Smoking habits",
        inputType: "radio",
        options: [
          {
            text: "Never",
            value: "never"
          },
          {
            text: "Occasionally",
            value: "occasionally"
          },
          {
            text: "Frequently",
            value: "frequently"
          }
        ],
        placeholder: "",
        userMeta: [
          {
            value: "never"
          }
        ]
      },
      {
        id: 13,
        label: "Hometown",
        inputType: "text",
        options: [],
        placeholder: "Enter your hometown",
        userMeta: [
          {
            value: "Brennabury"
          }
        ]
      },
      {
        id: 14,
        label: "Intended major",
        inputType: "text",
        options: [],
        placeholder: "Enter your intended major",
        userMeta: [
          {
            value: "Hospitality"
          },
          {
            value: "Kinesiology"
          },
          {
            value: "Photojournalism"
          }
        ]
      }
    ]
  },
  {
    title: "Interests",
    description: "User profile setting.",
    icon: "",
    formInputs: [
      {
        id: 15,
        label: "Hobbies & interests",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: [
          {
            value: "Animals and pet sitter or veterinaria"
          },
          {
            value: "Golf"
          },
          {
            value: "Hiking"
          },
          {
            value: "Musical instrument"
          },
          {
            value: "Photography"
          },
          {
            value: "Skydiving"
          }
        ]
      },
      {
        id: 16,
        label: "Clubs & memberships",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: []
      },
      {
        id: 17,
        label: "Favorite movies & TV shows",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: []
      },
      {
        id: 18,
        label: "Music",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: []
      },
      {
        id: 19,
        label: "Books",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: [
          {
            value: "Bowling Alone"
          },
          {
            value:
              "Brainstorms: Philosophical Essays on Mind and Psychology"
          },
          {
            value: "Farmer Giles of Ham"
          },
          {
            value: "Going After Cacciato"
          },
          {
            value: "Stephen Hawking's Universe"
          },
          {
            value: "The Clan of the Cave Bear"
          },
          {
            value: "The History of Sexuality  Volume 2"
          },
          {
            value: "The Last Life"
          },
          {
            value: "The Lovely Bones"
          }
        ]
      },
      {
        id: 20,
        label: "Games",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: [
          {
            value: "Archon II: Adept"
          },
          {
            value: "Arcomage"
          },
          {
            value: "Assassin's Creed"
          },
          {
            value: "Chaos Overlords"
          },
          {
            value: "Empire"
          },
          {
            value: "Etherlords"
          },
          {
            value: "Global Diplomacy"
          },
          {
            value: "Heroes of Might and Magic IV: Winds of War"
          },
          {
            value: "Master of Orion"
          },
          {
            value: "Minecraft"
          },
          {
            value: "MoonBase Commander"
          },
          {
            value: "Slay"
          }
        ]
      },
      {
        id: 21,
        label: "Communities",
        inputType: "multiselect",
        options: [],
        placeholder: "Start typing separated by comma",
        userMeta: []
      }
    ]
  },
  {
    title: "Living Detail",
    description: "User profile setting.",
    icon: "",
    formInputs: [
      {
        id: 22,
        label: "Enrollment ID",
        inputType: "text",
        options: [],
        placeholder: "Start typing",
        userMeta: [
          {
            value: "00dflxawtul"
          },
          {
            value: "25c91oacbko"
          },
          {
            value: "99dvsa6vq00"
          }
        ]
      },
      {
        id: 23,
        label: "Building",
        inputType: "text",
        options: [],
        placeholder: "Enter your building information",
        userMeta: [
          {
            value: "Resolution Tower"
          }
        ]
      },
      {
        id: 24,
        label: "Room",
        inputType: "text",
        options: [],
        placeholder: "Enter your room number",
        userMeta: [
          {
            value: "96440"
          }
        ]
      },
      {
        id: 25,
        label: "Programs",
        inputType: "text",
        options: [],
        placeholder: "Enter your educational program",
        userMeta: [
          {
            value: "MS"
          },
          {
            value: "PhD"
          }
        ]
      }
    ]
  },
  {
    title: "Video Introduction",
    description: "User profile setting.",
    icon: "",
    formInputs: [
      {
        id: 26,
        label: "Youtube video URL",
        inputType: "text",
        options: [],
        placeholder: "youtube.com/",
        userMeta: [
          {
            value: "https://www.youtube.com/watch?v=kfePLouvvW4"
          },
          {
            value: "https://www.youtube.com/watch?v=L2RSDJY01dE"
          },
          {
            value: "https://www.youtube.com/watch?v=rdwK7Rc1nEw"
          }
        ]
      }
    ]
  }
];
