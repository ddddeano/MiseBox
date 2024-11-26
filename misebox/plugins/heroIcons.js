import { defineNuxtPlugin } from '#app'
import {
  ArrowUpCircleIcon,
  ArrowUpOnSquareIcon,
  AtSymbolIcon,
  Bars3Icon,
  CalendarIcon,
  CameraIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  IdentificationIcon,
  HeartIcon,
  MinusCircleIcon,
  MoonIcon,
  PaperClipIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  QrCodeIcon,
  RocketLaunchIcon,
  SunIcon,
  SparklesIcon,
  UserCircleIcon,
  XCircleIcon,
  XMarkIcon,
  CakeIcon,
  ArrowRightEndOnRectangleIcon, // Import the new icon
} from '@heroicons/vue/24/solid'

export default defineNuxtPlugin((nuxtApp) => {
  const icons = {
    ArrowUpCircleIcon,
    ArrowUpOnSquareIcon,
    AtSymbolIcon,
    Bars3Icon,
    CalendarIcon,
    CameraIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    DevicePhoneMobileIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    EyeIcon,
    HeartIcon,
    IdentificationIcon,
    MinusCircleIcon,
    MoonIcon,
    PaperClipIcon,
    PencilIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    QrCodeIcon,
    RocketLaunchIcon,
    SunIcon,
    SparklesIcon,
    UserCircleIcon,
    XCircleIcon,
    XMarkIcon,
    CakeIcon,
    ArrowRightEndOnRectangleIcon, // Add the new icon to the icons object
  }

  Object.entries(icons).forEach(([name, component]) => {
    if (!nuxtApp.vueApp.component(name)) {
      nuxtApp.vueApp.component(name, component)
    }
  })
})
