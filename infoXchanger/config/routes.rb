Rails.application.routes.draw do
  root 'home#index'

  get 'users/myprofile'
  devise_for :users, controllers: {:omniauth_callbacks => "users/omniauth_callbacks", sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }
  resources :users, only: [:show]
  #devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
