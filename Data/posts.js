import { Users } from "./users";

export const Posts = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1666305132656-097bd699e023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    user: Users[0].user,
    likes: 7689,
    caption: "Work is worship",
    profilePic: Users[0].image,
    comments: [
      {
        user: "kingClan",
        comment: "Looking gorgeous",
      },
      {
        user: "JaaiSai",
        comment: "Yeah wow!!",
      },
    ],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1666443075691-d151747ec50f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80",
    user: Users[1].user,
    likes: 5589,
    caption: "Art is in my blood",
    profilePic: Users[1].image,
    comments: [
      {
        user: "jappajoi",
        comment: "Really Colorful",
      },
      {
        user: "prem657",
        comment: "Artistic work !!",
      },
    ],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1666132316403-5a37295d19c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    user: Users[2].user,
    likes: 45222,
    caption: "Feel the nature",
    profilePic: Users[2].image,
    comments: [
      {
        user: "gotohell",
        comment: "It's very Refreshing",
      },
      {
        user: "naturesins",
        comment: "Amazing view",
      },
    ],
  },
];

export const PostFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/ios-glyphs/340/ffffff/like--v2.png",
    likedImgUrl: "https://img.icons8.com/ios-glyphs/344/E74C3C/like--v1.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/ios/64/ffffff/speech-bubble--v2.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/material-outlined/452/ffffff/filled-sent.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/344/ffffff/external-bookmark-library-tanah-basah-basic-outline-tanah-basah.png",
  },
];
