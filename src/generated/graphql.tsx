import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Blog = {
  __typename?: 'Blog';
  addTime?: Maybe<Scalars['Int']>;
  author?: Maybe<User>;
  authorId: Scalars['Int'];
  context: Scalars['String'];
  id: Scalars['Int'];
  likes?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog?: Maybe<Blog>;
  createUser?: Maybe<User>;
  deleteBlog?: Maybe<Blog>;
  editBlog?: Maybe<Blog>;
  likeUser?: Maybe<Scalars['Int']>;
  signUp?: Maybe<User>;
};


export type MutationCreateBlogArgs = {
  context: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteBlogArgs = {
  id: Scalars['Int'];
};


export type MutationEditBlogArgs = {
  context: Scalars['String'];
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationLikeUserArgs = {
  id: Scalars['Int'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  blog?: Maybe<Blog>;
  blogs?: Maybe<Array<Maybe<Blog>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'User';
  /** Date Type */
  blogs?: Maybe<Array<Maybe<Blog>>>;
  created: Scalars['String'];
  id: Scalars['Int'];
  likes?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};
