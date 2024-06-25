import { AvatarComponent } from 'avatar-initials';

export default function UserLogo({name}) {
    const userName = name.split(' ');
    console.log(userName);
    let firstName;
    let lastName;
    if(userName.length >1){
     firstName= userName[0];
     lastName = userName[1];
    }
     else {firstName= name[0];
     lastName = "*";
     }
     firstName = firstName.toUpperCase();
     lastName = lastName.toUpperCase();

  // ...
  return (
    <div className={`w-10 h-10 flex self-center items-center justify-between relative`}>
    
        <AvatarComponent
          classes="rounded-full"
          useGravatar={false}
          size={44}
          color="#000000"
          background="#f1f1f1"
          fontSize={16}
          fontWeight={400}
          offsetY={24}
          initials={`${firstName[0]}${lastName[0]}`}
        />
     
    </div>
  );
}