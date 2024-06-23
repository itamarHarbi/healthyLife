import React from 'react'

export default function SignduserDropDown() {
  return (
    <div class="menu">
      <h3>Someone Famous<br /><span>Website Designer</span></h3>
      <ul>
        <li>
          <img src="./assets/icons/user.png" /><a href="#">My profile</a>
        </li>
        <li>
          <img src="./assets/icons/edit.png" /><a href="#">Edit profile</a>
        </li>
        <li>
          <img src="./assets/icons/envelope.png" /><a href="#">Inbox</a>
        </li>
        <li>
          <img src="./assets/icons/settings.png" /><a href="#">Setting</a>
        </li>
        <li><img src="./assets/icons/question.png" /><a href="#">Help</a></li>
        <li>
          <i class="fa fa-sign-out" aria-hidden="true"></i><a href="#">Logout</a>
        </li>
      </ul>
    </div>
  )
}
