import React from 'react';

export const likes:string[] = [];

export const LikesContext = React.createContext({likes, updateLikes: (like: any) => {}}); // Create a context for the likes array and the updateLikes function