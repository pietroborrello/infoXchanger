class InforequestsController < ApplicationController
  def show
    @requests = [{asker: 1, asked: current_user.id, info: '4 5 6 7'},{asker: 1, asked: current_user.id, info: '4 5 6 7'}]
    #@requests = Inforequest.where(asked: current_user)
  end
end
