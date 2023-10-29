import Break from "./Break";

const meta = { component: Break, title: "Pages/Break" };
export default meta;

export const BreakStory = {
  args: {
    setAnnouncementMessageString: () => {
      console.log("announce: your break is done");
    },
  },
};
