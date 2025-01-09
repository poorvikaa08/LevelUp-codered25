import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
      <div className=" h-screen-full bg-[url('/assests/image.png')] container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Hello 👋</h1>
                <p className="text-muted-foreground">
                  Welcome to LevelUp, check your priority learning.
                </p>
              </div>
              <div className="flex gap-4 sm:gap-6">
                <div className="text-center flex-1 sm:flex-none">
                  <div className="text-xl sm:text-2xl font-bold">100</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Points</div>
                </div>
                <div className="text-center flex-1 sm:flex-none">
                  <div className="text-xl sm:text-2xl font-bold">32</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Badges</div>
                </div>
                <div className="text-center flex-1 sm:flex-none">
                  <div className="text-xl sm:text-2xl font-bold">12</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </div>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-green-500 px-2 py-1 text-xs text-white">
                    New
                  </span>
                  <h2 className="font-semibold">Feature Discussion</h2>
                </div>
                <p className="mt-2 text-muted-foreground">
                  The learning content are a new feature in "Feature Discussion" can be explain the material problem chat.{" "}
                  <a href="#" className="font-medium text-primary hover:underline">
                    Go to detail →
                  </a>
                </p>
              </CardContent>
            </Card>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">In progress learning content</h2>
                <a href="#" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>
              <div className="space-y-4">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                      <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100" />
                      <div className="flex-1 w-full sm:w-auto">
                        <div className="mb-2 font-semibold">{course.title}</div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {course.materials} Material
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={course.completion} className="w-20" />
                            <span className="text-sm text-muted-foreground">
                              {course.completion}%
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {course.deadline}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant={course.completion ? "outline" : "default"}
                        className="w-full sm:w-auto"
                      >
                        {course.completion ? "Continue" : "Start"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Calendar</h3>
                </div>
                <Calendar className="rounded-md border" />
              </CardContent>
            </Card>

            <Card className="sticky top-[420px]">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Streaks</h3>
                  <Button variant="ghost" size="sm">
                    See Detail
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>Daily Goal: 6/30 learning completed</div>
                  <div>
                    Your Longest streak: 1 Day
                    <div className="text-sm text-muted-foreground">
                      (28 Sep 23 - 4 Oct 23)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}

const courses = [
<<<<<<< HEAD
  {
    id: 1,
    title: "Mastering UI/UX Design: A Guide",
    materials: 5,
    completion: 0,
    deadline: "1 Day",
  },
  {
    id: 2,
    title: "Creating Engaging Learning Journeys",
    materials: 12,
    completion: 64,
    deadline: "12 hrs",
  },
]
=======
  
    {
      id: 1,
      title: "Mastering UI/UX Design: A Guide",
      materials: 5,
      completion: 0,
      deadline: "1 Day",
    },
    {
      id: 2,
      title: "Creating Engaging Learning Journeys",
      materials: 12,
      completion: 64,
      deadline: "12 hrs",
    },
    {
      id: 3,
      title: "Introduction to Web Development",
      materials: 8,
      completion: 45,
      deadline: "3 Days",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      materials: 15,
      completion: 25,
      deadline: "1 Week",
    },
    {
      id: 5,
      title: "Effective Communication Skills",
      materials: 6,
      completion: 90,
      deadline: "2 Days",
    },
    {
      id: 6,
      title: "JavaScript for Beginners",
      materials: 10,
      completion: 30,
      deadline: "4 Days",
    },
    {
      id: 7,
      title: "Machine Learning Essentials",
      materials: 20,
      completion: 10,
      deadline: "2 Weeks",
    },
  ];
  

>>>>>>> parent of 268dcf3 (ui)

