Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users
  resources :bonds 
  resources :bond_invites, only: [:create, :destroy]
  resources :med_groups 
  resources :meds, only: [:show, :create, :destroy]
  resources :med_histories, only: [:show, :create]

  get 'auth/user', to: 'users#get_auth_user_data'
  post 'auth/sign-in', to: 'users#sign_in'
  delete 'auth/sign-out/:user_id', to: 'users#sign_out'
end
