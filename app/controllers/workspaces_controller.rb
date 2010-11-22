class WorkspacesController < ApplicationController
  layout 'client'
  protect_from_forgery

  caches_page :show

  def show
    csrf = form_authenticity_token
    respond_to do |format|
      format.html
      format.xml  { render :xml => Workspace.new(csrf, current_user) }
      format.json { render :json => Workspace.new(csrf, current_user) }
    end
  end
end
