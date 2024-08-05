export interface ISigninForm {
	email: string
	password: string
}

export interface ISignupForm extends ISigninForm {
	username?: string
}

export interface IUser {
	id: string
	email: string
	username: string
	avatarPath: string
}

export type TypeUserForm = Partial<Omit<IUser, 'id'>> & { password?: string }

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
