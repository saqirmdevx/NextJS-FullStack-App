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

export type AuthUser = {
  __typename?: 'AuthUser';
  token: Scalars['String'];
  user: User;
};

export type Blog = {
  __typename?: 'Blog';
  addTime?: Maybe<Scalars['Int']>;
  author?: Maybe<User>;
  authorId: Scalars['Int'];
  body: Scalars['String'];
  id: Scalars['Int'];
  likes?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type CreateBlogInput = {
  body: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type EditBlogInput = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog?: Maybe<Blog>;
  createUser: AuthUser;
  deleteBlog?: Maybe<Blog>;
  editBlog?: Maybe<Blog>;
  likeBlog?: Maybe<Blog>;
  likeUser?: Maybe<User>;
  login?: Maybe<AuthUser>;
};


export type MutationCreateBlogArgs = {
  input: CreateBlogInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBlogArgs = {
  id: Scalars['Int'];
};


export type MutationEditBlogArgs = {
  input: EditBlogInput;
};


export type MutationLikeBlogArgs = {
  id: Scalars['Int'];
};


export type MutationLikeUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  allBlogs?: Maybe<Array<Maybe<Blog>>>;
  authorBlogs?: Maybe<Array<Maybe<Blog>>>;
  blog?: Maybe<Blog>;
  refreshToken?: Maybe<User>;
  user?: Maybe<User>;
};


export type QueryAuthorBlogsArgs = {
  authorId: Scalars['Int'];
};


export type QueryBlogArgs = {
  id: Scalars['Int'];
};


export type QueryRefreshTokenArgs = {
  token: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
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

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}
