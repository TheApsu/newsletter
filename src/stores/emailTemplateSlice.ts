import { StateCreator } from 'zustand';

export type EmailTemplateType = {
  header: Header;
  logo: string;
  mainImage: string;
  content: string;
  endContent: string;
  listCard: TemplateCard[];
};

type TemplateCard = {
  header: Header;
  content: Header;
  image: string;
  backgroundColor: string;
  button: ButtonCard;
};

type ButtonCard = Header & {
  href?: string;
};

type Header = {
  title: string;
  fontColor?: string;
  backgroundColor?: string;
};

export const createEmailTemplateSlice: StateCreator<
  EmailTemplateType,
  [],
  [],
  EmailTemplateType
> = () => ({
  header: {
    fontColor: '#fff',
    backgroundColor: '#0fa49f',
    title: 'october 2024 | Issue No. 2',
  },
  content: ` Welcome to the very first
            edition of IPC Miami Beach's newsletter! As the premier provider of
            home management services for luxury residences and condos in Miami,
            we are thrilled to share the latest updates, insights, and
            maintenance tips for your exquisite properties. Our newsletter aims
            to keep you informed and inspired, whether you're looking to boost
            your home's value, prepare for seasonal maintenance, or explore new
            luxury services tailored to your lifestyle.
            
            At IPC, our commitment is to deliver seamless and exceptional care
            for your home, allowing you to fully enjoy all that Miami has to
            offer. Thank you for being a valued member of the IPC family! Stay
            with us for what’s to come and experience IPC like never before.`,
  endContent: 'Join us for what’s ahead and experience IPC like never before.',
  listCard: [
    {
      image:
        'https://api-test.laherhost.com/images/temp/1728047204131-33d9d628-c42d-446d-8587-72bfc5e47154.jpg',
      backgroundColor: '#e4f4f4',
      header: {
        title: 'Welcome back - Homeowner’s checklist',
        fontColor: '#e67e1f',
      },
      content: {
        title: `To help you settle in quickly so you can begin to enjoy your
                home, IPC has created a short checklist to follow 2.`,
      },
      button: {
        title: 'READ MORE',
        backgroundColor: '#4fcccc',
        href: 'https://ipcmiamibeach.com/luxury-or-safety-why-not-both/',
      },
    },
  ],
  logo: 'https://api-test.laherhost.com/images/temp/1727962689002-54d8347a-214d-437a-ae5b-f4b28ce43ba8.png',
  mainImage:
    'https://api-test.laherhost.com/images/temp/1728054004070-60243282-c4fe-47be-808b-b593b07660fa.png',
});
