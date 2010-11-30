class WorkspacesController < ApplicationController
  layout 'client'
  protect_from_forgery

  def show
    csrf = form_authenticity_token
    respond_to do |format|
      format.html do
        #response.headers['Cache-Control'] = 'public, max-age=30000'
        render :action => 'show'
      end
      format.xml  { render :xml => Workspace.new(csrf, current_user) }
      format.json { render :json => Workspace.new(csrf, current_user) }
    end
  end
end
