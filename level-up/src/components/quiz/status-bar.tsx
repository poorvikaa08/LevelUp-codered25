import { Info } from 'lucide-react'
interface StatusBarProps {
    timeLeft: string;
    currentSection: string;
    onSectionChange: (section: string) => void;
  }
  

  export function StatusBar({ timeLeft, currentSection, onSectionChange }: StatusBarProps) {
    const sections = ['Easy', 'Medium', 'Hard']
    
    
    return (
        <div className="bg-blue-50 p-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* <div className="flex items-center gap-4">
              <div className="text-sm">Sections</div>
              <div className="flex gap-2">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => onSectionChange(section)}
                    className={`px-4 py-1 rounded-full flex items-center ${
                      currentSection === section
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border hover:bg-gray-100'
                    }`}
                  >
                    {section} <Info className="h-4 w-4 ml-1" />
                  </button>
                ))}
              </div>
            </div> */}
            <div className="flex items-center gap-4"></div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                Time Left : <span className="text-red-500 font-mono">{timeLeft}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

