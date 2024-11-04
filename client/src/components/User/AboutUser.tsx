import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel, MdOutlineSave } from "react-icons/md";
import { RefObject } from "react";
import { UserData } from "../../TypeDefinition/TypeDefinition";

type AboutUserProps = {
  userData: UserData;
  edit?: boolean;
  handleEdit?: () => void;
  handleSave?: (event: React.FormEvent) => Promise<void>;
  about?: RefObject<HTMLTextAreaElement>;
};

const AboutUser = ({
  userData,
  edit,
  handleEdit,
  handleSave,
  about,
}: AboutUserProps) => {
  return (
    <section className="max-w-[1216px] lg:max-h-[344px] bg-[#F6F6F7] dark:bg-[#242535] dark:text-white p-12 rounded-xl mb-12">
      <div className="flex flex-col justify-center items-center max-w-[648px] lg:max-h-[284px] mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img
            className="max-w-[64px] max-h-[64px] object-contain rounded-full"
            src={userData.photo || "https://i.ibb.co/Ydc2Yyb/download.png"}
            alt="user-image"
          />
          <div>
            <h4 className="font-medium text-xl text-[#181A2A] dark:text-white">
              {userData.name}
            </h4>
            <p className="text-[#696A75] font-normal text-sm dark:text-[#BABABF]">
              {/* {userData.role} */}
            </p>
          </div>
        </div>
        <div className="relative">
          {!edit && (
            <button onClick={handleEdit}>
              <CiEdit className="absolute text-lg dark:text-white right-0 -mt-5" />
            </button>
          )}
          {edit ? (
            <form onSubmit={handleSave}>
              <button type="submit">
                <MdOutlineSave className="absolute text-lg dark:text-white right-6 -mt-44" />
              </button>
              <button type="button" onClick={handleEdit}>
                <MdOutlineCancel className="absolute text-lg dark:text-white right-0 -mt-44" />
              </button>
              <textarea
                ref={about}
                name=""
                id=""
                cols={70}
                rows={5}
                defaultValue={userData.bio}
                placeholder="Write something about yourself"
                className="w-full appearance-none focus:outline-none mt-2 dark:text-black p-2 border rounded-md text-black font-medium max-h-36"
              ></textarea>
            </form>
          ) : (
            <>
              {userData.bio ? (
                <p className="text-[#181A2A] dark:text-white">{userData.bio}</p>
              ) : (
                <p>Please write something about you</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUser;
