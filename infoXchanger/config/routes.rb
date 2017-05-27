Rails.application.routes.draw do
  root 'home#index'

  get 'users/myprofile'
  get 'users/show'
  get 'users' => 'users#users'
  get 'users/search', to: 'users#search'
  get 'users/select', to: 'users#select'
  get 'users/token', to: 'users#token'
  devise_for :users, controllers: {:omniauth_callbacks => "users/omniauth_callbacks", sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
