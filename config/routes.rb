JLog::Engine.routes.draw do

  post 'log' => 'logger#log'

end