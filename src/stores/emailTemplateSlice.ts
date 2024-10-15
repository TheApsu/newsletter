import { StateCreator } from 'zustand';
import { FileResponse } from '@/types/index';
import { EmailTemplateApi, EmailTemplateItem } from '@/api/EmailTemplateApi';

export type EmailTemplateType = {
  header: Header;
  logo: string;
  mainImage: string;
  content: string;
  endContent: EndContent;
  listCard: TemplateCard[];
  isDuplicating: boolean;
  footer: Footer;
  // ACTIONS
  name: string;
  editingId?: string;
  setEmail: (email: EmailTemplateItem) => void;
  setEditingId: (id?: EmailTemplateApi['id'], isDuplicating?: boolean) => void;
  duplicate: (id: EmailTemplateApi['id']) => void;
  setHeader: (data: Header) => void;
  setLogo: (data: FileResponse) => void;
  setMainImage: (data: FileResponse) => void;
  setContent: (data: string) => void;
  setEndContentBody: (data: string) => void;
  setEndContentHref: (data: string) => void;
  setListCardImage: (data: FileResponse, index: number) => void;
  setListCardTitle: (data: string, index: number) => void;
  setListCardContent: (data: string, index: number) => void;
  setListCardButton: (data: string, index: number) => void;
  setListCardButtonHref: (data: string, index: number) => void;
  addOtherCardToList: () => void;
  removeCardFromList: (index: number) => void;
  setFooter: (
    property:
      | 'title'
      | 'buttons'
      | 'href'
      | 'location'
      | 'locationButtons'
      | 'locationHref',
    value: string,
    btnIndex?: number
  ) => void;
  getDataAsJSON: () => string;
  resetTemplate: () => void;
  resetToBaseTemplate: () => void;
};

type Footer = Header & {
  buttons: ButtonCard[];
  location: string;
  locationButtons: ButtonCard[];
};

type EndContent = {
  name: string;
  href?: string;
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
> = (set, get) => ({
  name: '',
  editingId: undefined,
  header: {
    fontColor: '#fff',
    backgroundColor: '#0fa49f',
    title: 'october 2024 | Issue No. 2',
  },
  isDuplicating: false,
  mainImage:
    'https://api-test.laherhost.com/images/temp/1728054004070-60243282-c4fe-47be-808b-b593b07660fa.png',
  logo: 'https://api-test.laherhost.com/images/temp/1727962689002-54d8347a-214d-437a-ae5b-f4b28ce43ba8.png',
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
  endContent: {
    name: 'Join us for what’s ahead and experience IPC like never before.',
    href: 'https://ipcmiamibeach.com',
  },
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
  footer: {
    title: 'Your Property is Our Priority!',
    backgroundColor: 'rgb(254, 103, 0)',
    fontColor: 'rgb(255, 255, 255)',
    location: '1000 5TH Street. Suite 226. Miami Beach, FL.',
    locationButtons: [
      {
        title: 'Privacy policy',
        fontColor: '#888',
        href: 'https://ipcmiamibeach.com/privacy-policy',
      },
      {
        title: 'Contact us',
        fontColor: '#888',
        href: 'https://ipcmiamibeach.com/contact/',
      },
      {
        title: 'Unsubscribe',
        fontColor: '#888',
        href: 'http://ipcmiamibeach.com',
      },
    ],
    buttons: [
      {
        title: 'Telephone',
        backgroundColor: 'rgb(0, 0, 0)',
        fontColor: 'rgb(255, 255, 255)',
        href: 'tel:+13055354265',
      },
      {
        title: 'Email',
        backgroundColor: 'rgb(0, 0, 0)',
        fontColor: 'rgb(255, 255, 255)',
        href: 'mailto:info@ipcmiamibeach.com',
      },
      {
        title: 'WhatsApp',
        backgroundColor: 'rgb(0, 0, 0)',
        fontColor: 'rgb(255, 255, 255)',
        href: 'https://wa.me/13055354265?text=Hello,%20how%20can%20we%20help%20you?',
      },
    ],
  },
  setHeader: (data) => {
    set({
      header: {
        fontColor: '#fff',
        backgroundColor: '#0fa49f',
        title: data.title,
      },
    });
  },
  setLogo: (data) => {
    set({
      logo: `${import.meta.env.VITE_API_URL}/images/${data.fileName[0]}`,
    });
  },
  setMainImage: (data) => {
    set({
      mainImage: `${import.meta.env.VITE_API_URL}/images/${data.fileName[0]}`,
    });
  },
  setContent: (content) => {
    set({
      content,
    });
  },
  setEndContentBody: (value: string) => {
    set({
      endContent: {
        ...get().endContent,
        name: value,
      },
    });
  },
  setEndContentHref: (value: string) => {
    set({
      endContent: {
        ...get().endContent,
        href: value,
      },
    });
  },
  setListCardImage: (image, index) => {
    set({
      listCard: get().listCard.map((value, SIndex) => {
        if (index === SIndex) {
          value.image = `${import.meta.env.VITE_API_URL}/images/${
            image.fileName[0]
          }`;
        }
        return value;
      }),
    });
  },
  setListCardTitle: (title, index) => {
    set({
      listCard: get().listCard.map((value, SIndex) => {
        if (index === SIndex) {
          value.header = {
            ...value.header,
            title,
          };
        }
        return value;
      }),
    });
  },
  setListCardContent: (title, index) => {
    set({
      listCard: get().listCard.map((value, SIndex) => {
        if (index === SIndex) {
          value.content = {
            ...value.content,
            title,
          };
        }
        return value;
      }),
    });
  },
  setListCardButton: (title, index) => {
    set({
      listCard: get().listCard.map((value, SIndex) => {
        if (index === SIndex) {
          value.button = {
            ...value.button,
            title,
          };
        }
        return value;
      }),
    });
  },
  setListCardButtonHref: (href, index) => {
    set({
      listCard: get().listCard.map((value, SIndex) => {
        if (index === SIndex) {
          value.button = {
            ...value.button,
            href,
          };
        }
        return value;
      }),
    });
  },
  addOtherCardToList: () => {
    set({
      listCard: [
        ...get().listCard,
        {
          image: '',
          backgroundColor: '#e4f4f4',
          header: {
            title: '',
            fontColor: '#e67e1f',
          },
          content: {
            title: ``,
          },
          button: {
            title: '',
            backgroundColor: '#4fcccc',
            href: '',
          },
        },
      ],
    });
  },
  removeCardFromList: (index) => {
    set({
      listCard: get().listCard.filter((_, Sindex) => Sindex != index),
    });
  },
  setFooter: (property, value, btnIndex) => {
    if (property === 'title' || property === 'location') {
      set({
        footer: {
          ...get().footer,
          [property]: value,
        },
      });
    } else if (property === 'buttons' || property === 'locationButtons') {
      set({
        footer: {
          ...get().footer,
          [property]: [
            ...get().footer[property].map((button, index) => {
              if (index === btnIndex) {
                button.title = value;
              }
              return button;
            }),
          ],
        },
      });
    } else if (property === 'href' || property === 'locationHref') {
      const parsedProperty =
        property === 'href' ? 'buttons' : 'locationButtons';
      set({
        footer: {
          ...get().footer,
          [parsedProperty]: [
            ...get().footer[parsedProperty].map((button, index) => {
              if (index === btnIndex) {
                button.href = value;
              }
              return button;
            }),
          ],
        },
      });
    }
  },
  getDataAsJSON: () => {
    const data = {
      header: get().header,
      logo: get().logo,
      mainImage: get().mainImage,
      content: get().content,
      endContent: get().endContent,
      listCard: get().listCard,
      footer: get().footer,
    };
    return JSON.stringify(data);
  },
  setEditingId: (editingId, isDuplicating = false) => {
    set({
      editingId,
      isDuplicating,
    });
  },
  setEmail: (email) => {
    const parsedJSON = JSON.parse(email.data);
    set({
      name: email.name,
      ...parsedJSON,
    });
  },
  resetToBaseTemplate: () => {
    set({
      name: '',
      editingId: undefined,
      header: {
        fontColor: '#fff',
        backgroundColor: '#0fa49f',
        title: 'october 2024 | Issue No. 2',
      },
      isDuplicating: false,
      mainImage:
        'https://api-test.laherhost.com/images/temp/1728054004070-60243282-c4fe-47be-808b-b593b07660fa.png',
      logo: 'https://api-test.laherhost.com/images/temp/1727962689002-54d8347a-214d-437a-ae5b-f4b28ce43ba8.png',
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
      endContent: {
        name: 'Join us for what’s ahead and experience IPC like never before.',
        href: 'https://ipcmiamibeach.com',
      },
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
      footer: {
        title: 'Your Property is Our Priority!',
        backgroundColor: 'rgb(254, 103, 0)',
        fontColor: 'rgb(255, 255, 255)',
        location: '1000 5TH Street. Suite 226. Miami Beach, FL.',
        locationButtons: [
          {
            title: 'Privacy policy',
            fontColor: '#888',
            href: 'https://ipcmiamibeach.com/privacy-policy',
          },
          {
            title: 'Contact us',
            fontColor: '#888',
            href: 'https://ipcmiamibeach.com/contact/',
          },
          {
            title: 'Unsubscribe',
            fontColor: '#888',
            href: 'http://ipcmiamibeach.com',
          },
        ],
        buttons: [
          {
            title: 'Telephone',
            backgroundColor: 'rgb(0, 0, 0)',
            fontColor: 'rgb(255, 255, 255)',
            href: 'tel:+13055354265',
          },
          {
            title: 'Email',
            backgroundColor: 'rgb(0, 0, 0)',
            fontColor: 'rgb(255, 255, 255)',
            href: 'mailto:info@ipcmiamibeach.com',
          },
          {
            title: 'WhatsApp',
            backgroundColor: 'rgb(0, 0, 0)',
            fontColor: 'rgb(255, 255, 255)',
            href: 'https://wa.me/13055354265?text=Hello,%20how%20can%20we%20help%20you?',
          },
        ],
      },
    });
  },
  resetTemplate: () => {
    set({
      name: '',
      editingId: '',
      header: {
        title: '',
        backgroundColor: '#0fa49f',
        fontColor: '#fff',
      },
      logo: '',
      mainImage: '',
      content: '',
      endContent: { name: '', href: '' },
      listCard: [],
      footer: {
        buttons: [
          {
            title: '',
            backgroundColor: 'rgb(0, 0, 0)',
            fontColor: 'rgb(255, 255, 255)',
            href: '',
          },
          {
            title: '',
            backgroundColor: 'rgb(0, 0, 0)',
            fontColor: 'rgb(255, 255, 255)',
            href: '',
          },
          {
            title: '',
            backgroundColor: 'rgb(0, 0, 0)',
            fontColor: 'rgb(255, 255, 255)',
            href: '',
          },
        ],
        location: '',
        locationButtons: [
          {
            title: '',
            fontColor: '#888',
            href: '',
          },
          {
            title: '',
            fontColor: '#888',
            href: '',
          },
          {
            title: '',
            fontColor: '#888',
            href: '',
          },
        ],
        title: '',
        backgroundColor: 'rgb(254, 103, 0)',
        fontColor: 'rgb(255, 255, 255)',
      },
    });
  },
  duplicate: (editingId) => {
    if (get().editingId === editingId) {
      set({
        editingId: '',
        isDuplicating: true,
      });
    } else {
      set({
        editingId,
        isDuplicating: true,
      });
    }
  },
});
