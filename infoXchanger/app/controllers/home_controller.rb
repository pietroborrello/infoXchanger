class HomeController < ApplicationController
  def index
    if params[:t]
      redirect_to users_show_path t: params[:t]
    end
  end
end
