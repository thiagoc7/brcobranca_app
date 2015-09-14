Rails.application.routes.draw do

  resources :banks

  resources :boletos do
    collection do
      get :generate
      get :generate_many
    end
  end

  resources :clients

  root 'boletos#index'

end
