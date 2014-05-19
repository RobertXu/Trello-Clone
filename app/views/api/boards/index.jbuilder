json.users do
  json.array! User.all, :email
end

json.boards do
  json.array! @boards, partial: 'api/boards/board', as: :board
end
